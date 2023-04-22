// @refresh reload
import { Suspense } from "solid-js"
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start"

export default () =>
	<Html lang="en">
		<Head>
			<Title>ANSI Docs</Title>
			<Meta charset="utf-8"/>
			<Meta name="viewport" content="width=device-width, initial-scale=1"/>
		</Head>

		<Body style={{
			"font-family": "sans-serif",
			margin: "auto auto 10vh auto",
			"font-size": "1.1rem",
			width: "max-content",
			"max-width": "min(55rem, calc(100% - 2rem))",
			background: "rgb(1, 2, 10)",
			color: "#cdd2f9"
		}}>
			<Suspense>
				<ErrorBoundary>
					<Routes><FileRoutes/></Routes>
				</ErrorBoundary>
			</Suspense>

			<Scripts/>
		</Body>
	</Html>
