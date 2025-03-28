import styled from "styled-components"
import { ZammYaml, ZammRequirement } from "../../../../src/shared/Zamm"
import { InfoBox, SectionHeading, SectionTitle } from "./Components"

interface ProjectOverviewProps {
	yamlData: ZammYaml
	onRequirementClick: (requirement: ZammRequirement) => void
	getImplementationName: (id: string | undefined) => string
}

const ProjectOverview = ({ yamlData, onRequirementClick, getImplementationName }: ProjectOverviewProps) => {
	return (
		<>
			{yamlData.project && (
				<Section>
					<SectionTitle>Project Details</SectionTitle>
					<SectionHeading>{yamlData.project.name}</SectionHeading>
					<Description>{yamlData.project.description}</Description>

					{yamlData.project.implementations && yamlData.project.implementations.length > 0 && (
						<ImplementationSubsection>
							<DetailsTitle>Project Implementations</DetailsTitle>
							{yamlData.project.implementations.map((impl, i) => (
								<InfoBox key={impl.id || i}>
									<ImplementationName>{impl.name || getImplementationName(impl.id)}</ImplementationName>
									{impl.description && <Description>{impl.description}</Description>}
								</InfoBox>
							))}
						</ImplementationSubsection>
					)}
				</Section>
			)}

			{yamlData.requirements && yamlData.requirements.length > 0 && (
				<Section>
					<SectionTitle>Requirements</SectionTitle>
					{yamlData.requirements.map((req, index) => (
						<InfoBox clickable key={index} onClick={() => onRequirementClick(req)} role="button" tabIndex={0}>
							<RequirementName>{req.name}</RequirementName>
							<Description>{req.description}</Description>
							{req.implementations && req.implementations.length > 0 && (
								<ImplementationIndicator>
									<i className="codicon codicon-list-tree" style={{ marginRight: "5px" }}></i>
									<span>
										{req.implementations.length} implementation
										{req.implementations.length !== 1 ? "s" : ""}
									</span>
								</ImplementationIndicator>
							)}
						</InfoBox>
					))}
				</Section>
			)}
		</>
	)
}

const Section = styled.div`
	margin-bottom: 20px;

	&:last-child {
		margin-bottom: 0;
	}
`

const Description = styled.p`
	margin: 0 0 10px 0;
	color: var(--vscode-descriptionForeground);
	line-height: 1.5;
`

const RequirementName = styled.h4`
	margin: 0 0 5px 0;
	font-size: 14px;
	color: var(--vscode-descriptionForeground);
	font-weight: 500;
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

const ImplementationName = styled.h5`
	margin: 0 0 5px 0;
	font-size: 13px;
	color: var(--vscode-descriptionForeground);
	font-weight: 500;
`

const ImplementationIndicator = styled.div`
	color: var(--vscode-descriptionForeground);
	font-size: 12px;
	margin-top: 5px;
	display: flex;
	align-items: center;
`

export default ProjectOverview
