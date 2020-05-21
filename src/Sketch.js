import React, { Component } from 'react'
import * as THREE from 'three'
import * as GLOBAL from './Global'

function cartesianCurve() {
    var points = []
    const TWO_PI = 2 * Math.PI

    for (var t = 0; t <= TWO_PI; t += 0.01) {
        var x = 0.25 * Math.cos(3 * t)
        var y = 0.25 * Math.sin(5 * t)
        points.push(new THREE.Vector2(x, y, 0))
    }
    return points
}

function parametricCurve() {
    var points = []
    const TWO_PI = 2 * Math.PI
    for (var t = 0; t <= TWO_PI; t += 0.01) {

        var r = (0.05) + (0.15) * Math.cos(3 * t)
        var phi = (Math.PI / 4) - Math.sin(t)

        var x = r * Math.cos(phi)
        var y = r * Math.sin(phi)

        points.push(new THREE.Vector2(x, y, 0))
    }
    return points
}

function local_variable_curve() {

    var points = []
    const TWO_PI = 2 * Math.PI
    for (var u = 0; u <= 5* TWO_PI; u += 0.01) {

        var x = 0.5 + (u/50)*Math.cos(u)
        var y = 0.1 + (u/50)*Math.sin(u)

        points.push(new THREE.Vector2(x, y, 0))
    }
    return points

}
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
        var pc_geo = new THREE.BufferGeometry().setFromPoints(parametricCurve())
        var pc = new THREE.Line(pc_geo, GLOBAL.Material.BlueLine)

        var cc_geo = new THREE.BufferGeometry().setFromPoints(cartesianCurve())
        var cc = new THREE.Line(cc_geo, GLOBAL.Material.RedLine)

        var lv_geo = new THREE.BufferGeometry().setFromPoints(local_variable_curve())
        var lv = new THREE.Line(lv_geo, GLOBAL.Material.GreenLine)

        this.scene.add(pc)
        this.scene.add(cc)
        this.scene.add(lv)
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