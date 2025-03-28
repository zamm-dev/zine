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
			<LinkWrapper onClick={onClick}>
				<LinkContent>
					<BookIcon className="codicon codicon-book" />
					<span>{text}</span>
				</LinkContent>
			</LinkWrapper>
		</Container>
	)
}

const Container = styled.div`
	padding: 10px 20px;
`

const LinkWrapper = styled(VSCodeLink)`
	color: var(--vscode-descriptionForeground);
	text-decoration: none;
	cursor: pointer;

	&:hover {
		text-decoration: none; /* Remove default underline */
	}
`

const LinkContent = styled.span`
	display: inline-flex;
	align-items: center;

	${LinkWrapper}:hover & span {
		text-decoration: underline; /* Apply underline to this container instead */
	}
`

const BookIcon = styled.i`
	margin-right: 8px;
	font-size: 14px;
`

export default ZammYamlLink
