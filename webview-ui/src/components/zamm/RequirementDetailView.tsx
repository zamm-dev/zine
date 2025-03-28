import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import styled from "styled-components"
import { ZammRequirement } from "../../../../src/shared/Zamm"

interface RequirementDetailViewProps {
	requirement: ZammRequirement
	onBackClick: () => void
}

const RequirementDetailView = ({ requirement, onBackClick }: RequirementDetailViewProps) => {
	return (
		<Section>
			<BackButtonContainer>
				<a href="#" onClick={onBackClick}>
					<i className="codicon codicon-arrow-left" style={{ marginRight: "5px" }}></i>
					Back to Requirements
				</a>
			</BackButtonContainer>

			<RequirementHeader>
				<RequirementName>{requirement.name}</RequirementName>
				<Description>{requirement.description}</Description>
			</RequirementHeader>

			{requirement.implementations && requirement.implementations.length > 0 && (
				<ImplementationSubsection>
					<DetailsTitle>Requirement Implementations:</DetailsTitle>
					{requirement.implementations.map((impl, i) => (
						<Implementation key={i}>
							<ImplementationName>{impl.name}</ImplementationName>
							{impl.commit && (
								<CommitInfo>
									<CommitLabel>Commit:</CommitLabel>
									<CommitHash>{impl.commit}</CommitHash>
								</CommitInfo>
							)}
							{impl.details && impl.details.length > 0 && (
								<DetailsList>
									{impl.details.map((detail, j) => (
										<DetailItem key={j}>{detail}</DetailItem>
									))}
								</DetailsList>
							)}
						</Implementation>
					))}
				</ImplementationSubsection>
			)}
		</Section>
	)
}

const Section = styled.div`
	margin-bottom: 20px;

	&:last-child {
		margin-bottom: 0;
	}
`

const BackButtonContainer = styled.div`
	margin-bottom: 15px;

	& a {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-decoration: none;
		color: var(--vscode-descriptionForeground);
	}
`

const RequirementHeader = styled.div`
	margin-bottom: 15px;
`

const RequirementName = styled.h4`
	margin: 0 0 5px 0;
	font-size: 14px;
	color: var(--vscode-descriptionForeground);
	font-weight: 500;
`

const Description = styled.p`
	margin: 0 0 10px 0;
	color: var(--vscode-descriptionForeground);
	line-height: 1.5;
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
	display: inline-block;
	max-width: 8ch;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const ImplementationSubsection = styled.div`
	margin-top: 10px;

	& p:last-child {
		margin-bottom: 0;
	}
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

const Implementation = styled.div`
	margin-top: 8px;
	padding: 12px;
	background-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 40%, transparent);
	border-radius: 3px;
`

const ImplementationName = styled.h5`
	margin: 0 0 5px 0;
	font-size: 13px;
	color: var(--vscode-descriptionForeground);
	font-weight: 500;
`

export default RequirementDetailView
