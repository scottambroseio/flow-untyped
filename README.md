# flow-untyped

A simple and basic tool to try and detect which project dependencies are flow-typed and which aren't

This project doesn't use an AST parser to resolve module imports (which would be preferred, however is more complicated to build), it simply looks at the project's package.json and works from there. This means it does result in picking up dependencies such as babel-presets which are never required in code.

The current naive implementation works as follows:
- Look for a package.json in the current directory
- Build an array of dependency names from the package.json
- For each dependency name
    - Get the dependencies main script from it's package.json (default to index.js)
    - Looks for a file of that name with .flow added in the same directory (main: src/index.js means looks for src/index.js.flow)
    - If found, module is typed
    - Else
        - Search for a relevantly named def file in the /flow-typed/npm folder
        - If found, module is typed
        - Else module is not typed
        
This tool will never be perfect with the way it works, it's just an excuse for me to build a NodeJs cli tool while having some actual use for me ^.^
        
TODO:
- Make it smarter (e.g read the [libs] section of the .flowconfig file and look in them for definitions also)!
- Make it print the version of the module rather than just the name
- Make it work with monorepo style projects rather than single projects
