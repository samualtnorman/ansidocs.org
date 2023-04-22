import { Title, A } from "solid-start"
import { HttpStatusCode } from "solid-start/server"

export default () => <>
	<Title>Not Found</Title>
	<HttpStatusCode code={404}/>
	<h1>404 Not Found</h1>

	<p>Visit <A href="/">Home Page</A></p>
</>
