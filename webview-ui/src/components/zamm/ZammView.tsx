import { useEffect, useState } from "react"
import styled from "styled-components"
import { vscode } from "../../utils/vscode"
import { ZammYaml, ZammRequirement } from "../../../../src/shared/Zamm"
import RequirementDetailView from "./RequirementDetailView"
import ProjectOverview from "./ProjectOverview"

interface ZammYamlViewProps {
	showZammView: boolean
}

const ZammYamlView = ({ showZammView }: ZammYamlViewProps) => {
	const [yamlData, setYamlData] = useState<ZammYaml | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedRequirement, setSelectedRequirement] = useState<ZammRequirement | null>(null)

	useEffect(() => {
		if (showZammView) {
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
		}
	}, [showZammView])

	if (!showZammView) {
		return null
	}

	const handleRequirementClick = (requirement: ZammRequirement) => {
		setSelectedRequirement(requirement)
	}

	const handleBackClick = () => {
		setSelectedRequirement(null)
	}

	return (
		<Container>
			<Content>
				{loading && <Loading>Loading ZAMM configuration...</Loading>}

				{error && <ErrorMessage>{error}</ErrorMessage>}

				{!loading && !error && yamlData && selectedRequirement ? (
					<RequirementDetailView
						projectName={yamlData.project?.name ?? "Project"}
						requirement={selectedRequirement}
						onBackClick={handleBackClick}
					/>
				) : (
					!loading &&
					!error &&
					yamlData && <ProjectOverview yamlData={yamlData} onRequirementClick={handleRequirementClick} />
				)}
			</Content>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: none;
	border: 1px solid color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 100%, transparent);
	border-radius: 4px;
	margin: 0 20px 20px;
	overflow: hidden;
	min-height: 400px;
`

const Content = styled.div`
	padding: 15px;
	overflow-y: auto;
	max-height: 400px;
	background: none;
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
