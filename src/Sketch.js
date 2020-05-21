import React, { Component } from 'react'
import * as THREE from 'three'
import * as GLOBAL from './Global'

class Sketch extends Component {
    constructor(props) {
        super(props)

        this.setup = this.setup.bind(this)
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)
    }

    async componentDidMount() {
        // Get width and height
        this.width = this.mount.clientWidth
        this.height = this.mount.clientHeight

        // Create a Blank scene
        this.scene = new THREE.Scene()
        
        // Get Ortho cam
        this.camera = GLOBAL.Camera.getOrthographicCamera(this.width, this.height)
        this.camera.updateProjectionMatrix()

        // Add light into scene
        this.scene.add(GLOBAL.Light.ambientLight)
        this.scene.add(GLOBAL.Light.directionalLight1())
        this.scene.add(GLOBAL.Light.directionalLight2())

        // Add helpers into scene
        this.scene.add(GLOBAL.Helper.gridHelper)
        this.scene.add(GLOBAL.Helper.axesHelper)

        // Get a renderer
        this.renderer = GLOBAL.Renderer.getDefaultRenderer(window, this.width, this.height)

        // Add domElement to HTML
        this.mount.appendChild(this.renderer.domElement)

        // Get Orbit controls
        this.controls = GLOBAL.Controller.getOrbitControl(this.camera, this.renderer.domElement)

        // Launch the sketch
        this.setup()
        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start() {

        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    setup() {
        // Draw here..
        this.cube = new THREE.Mesh(GLOBAL.Geometry.Cube, GLOBAL.Material.Basic)

        this.scene.add(this.cube)
    }

    animate() {

        // this.cube.rotation.x += 0.1
        // this.cube.rotation.y += 0.1

        this.renderScene()
        this.controls.update()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={GLOBAL.Style.canvasStyle}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default Sketch