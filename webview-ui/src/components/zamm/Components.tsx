import styled from "styled-components"

export const SectionTitle = styled.h3`
	margin: 0 0 10px 0;
	font-size: 14px;
	color: var(--vscode-descriptionForeground);
	border-bottom: 1px solid var(--vscode-descriptionForeground);
	padding-bottom: 5px;
	font-weight: 500;
	text-transform: uppercase;
`

export const SectionHeading = styled.h4`
	margin: 0 0 5px 0;
	font-size: 16px;
	color: var(--vscode-descriptionForeground);
`

const hoverEffect = `
  &:hover {
		background-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 100%, transparent);
		opacity: 1;
	}
`

export const InfoBox = styled.div<{ clickable?: boolean }>`
	margin-bottom: 15px;
	padding: var(--standard-padding);
	background-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 65%, transparent);
	border-radius: 4px;
	position: relative;
	overflow: hidden;
	opacity: 0.8;
	cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
	transition:
		opacity 0.2s ease,
		background-color 0.2s ease;

	&:last-child {
		margin-bottom: 0;
	}

	${({ clickable }) => (clickable ? hoverEffect : "")}
`
