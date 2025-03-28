import { useEffect, useState, useMemo } from "react"
import styled from "styled-components"
import { vscode } from "../../utils/vscode"
import { ZammYaml, ZammRequirement, ZammProjectImplementation, ZammRequirementImplementation } from "../../../../src/shared/Zamm"
import RequirementDetailView from "./RequirementDetailView"
import ProjectOverview from "./ProjectOverview"
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"

interface ZammYamlViewProps {
	onDone?: () => void
}

const ZammYamlView = ({ onDone }: ZammYamlViewProps) => {
	const [yamlData, setYamlData] = useState<ZammYaml | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedRequirement, setSelectedRequirement] = useState<ZammRequirement | null>(null)

	// Create a mapping of implementation IDs to their names
	const implementationMap = useMemo(() => {
		if (!yamlData?.project?.implementations) return new Map<string, string>()

		const map = new Map<string, string>()
		yamlData.project.implementations.forEach((impl) => {
			if (impl.id && impl.name) {
				map.set(impl.id, impl.name)
			}
		})
		return map
	}, [yamlData])

	// Helper function to get implementation name from ID
	const getImplementationName = (id: string | undefined): string => {
		if (!id) return "Unknown Implementation"
		return implementationMap.get(id) || `Implementation ${id.substring(0, 4)}...`
	}

	useEffect(() => {
		setLoading(true)
		setError(null)

		// Request the YAML content from the extension
		vscode.postMessage({ type: "requestZammYaml" })

		// Set up a listener for the response
		const handleMessage = (event: MessageEvent) => {
			const message = event.data
			if (message.type === "zammYamlContent") {
				if (message.error) {
					setError(message.error)
					setLoading(false)
				} else if (message.zammYamlContent) {
					setYamlData(message.zammYamlContent)
					setLoading(false)
				} else {
					setError("Received empty ZAMM YAML content")
					setLoading(false)
				}
			}
		}

		window.addEventListener("message", handleMessage)
		return () => {
			window.removeEventListener("message", handleMessage)
		}
	}, [])

	const handleRequirementClick = (requirement: ZammRequirement) => {
		setSelectedRequirement(requirement)
	}

	const handleBackClick = () => {
		setSelectedRequirement(null)
	}

	return (
		<Container>
			<Header>
				<Title>ZAMM Configuration</Title>
				{onDone && <VSCodeButton onClick={onDone}>Done</VSCodeButton>}
			</Header>
			<Content>
				{loading && <Loading>Loading ZAMM configuration...</Loading>}

				{error && <ErrorMessage>{error}</ErrorMessage>}

				{!loading && !error && yamlData && selectedRequirement ? (
					<RequirementDetailView
						projectName={yamlData.project?.name ?? "Project"}
						requirement={selectedRequirement}
						onBackClick={handleBackClick}
						getImplementationName={getImplementationName}
					/>
				) : (
					!loading &&
					!error &&
					yamlData && (
						<ProjectOverview
							yamlData={yamlData}
							onRequirementClick={handleRequirementClick}
							getImplementationName={getImplementationName}
						/>
					)
				)}
			</Content>
		</Container>
	)
}

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 17px 10px 20px;
`

const Title = styled.h3`
	color: var(--vscode-descriptionForeground);
	margin: 0;
`

const Content = styled.div`
	flex-grow: 1;
	overflow-y: auto;
	padding: 15px;
	--standard-padding: 12px;
`

const Loading = styled.div`
	color: var(--vscode-descriptionForeground);
	font-style: italic;
	padding: 10px 0;
`

const ErrorMessage = styled.div`
	color: var(--vscode-errorForeground);
	padding: 10px 0;
`

export default ZammYamlView
