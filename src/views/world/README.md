# World

The world component hosts the Pixi.js WebGL renderer and passes down props from the redux state.

The Pixi.JS layer could eventually be rewritten as either a new React renderer (using custom
reconciler) or simply by using React components that extend a Pixi.JS stage using lifecycle
methods.
