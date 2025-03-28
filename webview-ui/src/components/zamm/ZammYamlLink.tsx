import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import styled from "styled-components"

interface ZammYamlLinkProps {
	isShowing: boolean
	onClick: () => void
}

const ZammYamlLink = ({ isShowing, onClick }: ZammYamlLinkProps) => {
	const text = isShowing ? "Hide ZAMM Configuration" : "View ZAMM Configuration"
	return (
		<Container>
			<StyledLink onClick={onClick}>
				<Icon className="codicon codicon-book" />
				<span>{text}</span>
			</StyledLink>
		</Container>
	)
}

const Container = styled.div`
	padding: 10px 20px;
`

const StyledLink = styled(VSCodeLink)`
	color: var(--vscode-descriptionForeground);
	display: flex;
	align-items: center;
	text-decoration: none;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`

const Icon = styled.i`
	margin-right: 8px;
	font-size: 16px;
`

export default ZammYamlLink
