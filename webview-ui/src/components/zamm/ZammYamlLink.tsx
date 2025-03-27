import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import styled from "styled-components"

interface ZammYamlLinkProps {
	onClick: () => void
}

const ZammYamlLink = ({ onClick }: ZammYamlLinkProps) => {
	return (
		<Container>
			<StyledLink onClick={onClick}>
				<Icon className="codicon codicon-book" />
				<span>View ZAMM Configuration</span>
			</StyledLink>
		</Container>
	)
}

const Container = styled.div`
	padding: 10px 20px;
	margin-bottom: 10px;
`

const StyledLink = styled(VSCodeLink)`
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
