<!-- @format -->

# Flow builder

This project was generated with [Vite](https://vitejs.dev/) version 4.3.8.

### Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:9000/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Steps to create and add a new custom node to the flow builder

1. Create a new file in `src/components/Nodes` folder with the name of the node. For example `src/components/Nodes/MyCustomNode.jsx`
2. Add the node's Settings, Node and NodeBlock components and its factory function. Please refer the existing nodes for the structure.
3. Add the new node to `nodeTypes` and it's factory function to `nodeCreator` in `src/components/Flow.jsx`

The philosophy followed throughout the project is

- Keep the components as dumb as possible and move the logic to its corresponding helper functions. This helps in reusing the components in different contexts. For example, the settings for each node is dynamic and bound to the node object so the Sidebar component is kept dumb and simply renders the settings component passed to it.

- Colocate the node and its pet components in the same file. For example, the `MessageNode` component and its helper functions are colocated in the same file `src/components/Nodes/MessageNode.jsx`
