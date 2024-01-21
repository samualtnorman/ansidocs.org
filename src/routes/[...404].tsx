import { Title } from "@solidjs/meta"
import { HttpStatusCode } from "@solidjs/start"

export default () => <>
	<Title>Not Found</Title>
	<HttpStatusCode code={404}/>
	<h1>404 Not Found</h1>
	<p>Visit <a href="/">Home Page</a></p>
</>
