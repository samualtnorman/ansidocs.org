// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => <StartServer
	document={({ assets, children, scripts }) => <html lang="en">
		<head>
			<title>ANSI Docs</title>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<link rel="icon" href="/favicon.ico"/>
			{assets}
		</head>

		<body style={{
			"font-family": "sans-serif",
			margin: "auto auto 10vh auto",
			"font-size": "1.1rem",
			width: "max-content",
			"max-width": "min(55rem, calc(100% - 2rem))",
			background: "rgb(1, 2, 10)",
			color: "#cdd2f9"
		}}>
			{children}
			{scripts}
		</body>
	</html>}
/>)
