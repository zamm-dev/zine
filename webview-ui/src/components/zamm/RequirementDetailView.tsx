import styled from "styled-components"
import { ZammRequirement } from "../../../../src/shared/Zamm"
import { InfoBox, InfoBoxTitle, SectionDescription, SectionHeading, SectionTitle } from "./Components"

interface RequirementDetailViewProps {
	projectName: string
	requirement: ZammRequirement
	onBackClick: () => void
	getImplementationName: (id: string | undefined) => string
}

const RequirementDetailView = ({ projectName, requirement, onBackClick, getImplementationName }: RequirementDetailViewProps) => {
	return (
		<Section>
			<BackButtonContainer>
				<a href="#" onClick={onBackClick}>
					<i className="codicon codicon-arrow-left" style={{ marginRight: "5px" }}></i>
					{projectName} Home
				</a>
			</BackButtonContainer>

			<RequirementHeader>
				<SectionTitle>Requirement Details</SectionTitle>
				<SectionHeading>{requirement.name}</SectionHeading>
				<SectionDescription>{requirement.description}</SectionDescription>
			</RequirementHeader>

			{requirement.implementations && requirement.implementations.length > 0 && (
				<ImplementationSubsection>
					<SectionTitle>Implementations</SectionTitle>
					{requirement.implementations.map((impl, i) => (
						<InfoBox key={impl.id || i}>
							<InfoBoxTitle>{getImplementationName(impl.id)}</InfoBoxTitle>
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
						</InfoBox>
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

const DetailsList = styled.ul`
	margin: 0;
	padding-left: 20px;
`

const DetailItem = styled.li`
	margin-bottom: 5px;
	color: var(--vscode-foreground);
	font-size: 12px;
	line-height: 1.4;
`

export default RequirementDetailView
