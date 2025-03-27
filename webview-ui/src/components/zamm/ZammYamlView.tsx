import { useEffect, useState } from "react"
import styled from "styled-components"
import { vscode } from "../../utils/vscode"
import { ZammYaml } from "../../../../src/shared/ExtensionMessage"

interface ZammYamlViewProps {
	showZammView: boolean
}

const ZammYamlView = ({ showZammView }: ZammYamlViewProps) => {
	const [yamlData, setYamlData] = useState<ZammYaml | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

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

	return (
		<Container>
			<Content>
				{loading && <Loading>Loading ZAMM configuration...</Loading>}

				{error && <ErrorMessage>{error}</ErrorMessage>}

				{!loading && !error && yamlData && (
					<>
						{yamlData.project && (
							<Section>
								<SectionTitle>Project Details</SectionTitle>
								<ProjectName>{yamlData.project.name}</ProjectName>
								<Description>{yamlData.project.description}</Description>
							</Section>
						)}

						{yamlData.requirements && yamlData.requirements.length > 0 && (
							<Section>
								<SectionTitle>Requirements</SectionTitle>
								{yamlData.requirements.map((req, index) => (
									<Requirement key={index}>
										<RequirementName>{req.name}</RequirementName>
										<Description>{req.description}</Description>

										{req.commit && (
											<CommitInfo>
												<CommitLabel>Commit:</CommitLabel>
												<CommitHash>{req.commit}</CommitHash>
											</CommitInfo>
										)}

										{req.implementationDetails && req.implementationDetails.length > 0 && (
											<ImplementationDetails>
												<DetailsTitle>Implementation Details:</DetailsTitle>
												<DetailsList>
													{req.implementationDetails.map((detail, i) => (
														<DetailItem key={i}>{detail}</DetailItem>
													))}
												</DetailsList>
											</ImplementationDetails>
										)}
									</Requirement>
								))}
							</Section>
						)}
					</>
				)}
			</Content>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: none;
	border: 1px solid var(--vscode-panel-border);
	border-radius: 4px;
	margin: 0 20px 20px;
	overflow: hidden;
	min-height: 500px;
`

const Content = styled.div`
	padding: 15px;
	overflow-y: auto;
	max-height: 400px;
	background: none;
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

const Section = styled.div`
	margin-bottom: 20px;
`

const SectionTitle = styled.h3`
	margin: 0 0 10px 0;
	font-size: 14px;
	color: var(--vscode-descriptionForeground);
	border-bottom: 1px solid var(--vscode-panel-border);
	padding-bottom: 5px;
	font-weight: 500;
	text-transform: uppercase;
`

const ProjectName = styled.h4`
	margin: 0 0 5px 0;
	font-size: 16px;
	color: var(--vscode-descriptionForeground);
`

const Description = styled.p`
	margin: 0 0 10px 0;
	color: var(--vscode-descriptionForeground);
	line-height: 1.5;
`

const Requirement = styled.div`
	margin-bottom: 15px;
	padding: 12px;
	background-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 65%, transparent);
	border-radius: 4px;
	position: relative;
	overflow: hidden;
	opacity: 0.8;
	transition:
		opacity 0.2s ease,
		background-color 0.2s ease;

	&:hover {
		background-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 100%, transparent);
		opacity: 1;
	}
`

const RequirementName = styled.h4`
	margin: 0 0 5px 0;
	font-size: 14px;
	color: var(--vscode-descriptionForeground);
	font-weight: 500;
`

const CommitInfo = styled.div`
	display: flex;
	align-items: center;
	margin: 5px 0;
	font-family: var(--vscode-editor-font-family);
	font-size: 12px;
`

const CommitLabel = styled.span`
	color: var(--vscode-descriptionForeground);
	margin-right: 5px;
`

const CommitHash = styled.code`
	background-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 80%, transparent);
	padding: 2px 4px;
	border-radius: 3px;
	font-family: var(--vscode-editor-font-family);
	color: var(--vscode-descriptionForeground);
`

const ImplementationDetails = styled.div`
	margin-top: 10px;
`

const DetailsTitle = styled.h5`
	margin: 0 0 5px 0;
	font-size: 12px;
	color: var(--vscode-descriptionForeground);
	font-weight: 500;
	text-transform: uppercase;
`

const DetailsList = styled.ul`
	margin: 0;
	padding-left: 20px;
`

const DetailItem = styled.li`
	margin-bottom: 5px;
	color: var(--vscode-descriptionForeground);
	font-size: 12px;
	line-height: 1.4;
`

export default ZammYamlView
