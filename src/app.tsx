// @refresh reload
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"

export default () =>
	<Router root={props => <MetaProvider><Suspense>{props.children}</Suspense></MetaProvider>}><FileRoutes/></Router>
