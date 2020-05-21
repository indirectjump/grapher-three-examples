import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Material {
    static Basic = new THREE.MeshLambertMaterial({
        color: 0x00ff00
    })

    static RedLine = new THREE.LineBasicMaterial({
        color: 0xff0000
    })

    static GreenLine = new THREE.LineBasicMaterial({
        color: 0x00ff00
    })

    static BlueLine = new THREE.LineBasicMaterial({
        color: 0x0000ff
    })
}

class Geometry {
    static Cube = new THREE.BoxGeometry(0.1, 0.1, 0.1)
}

class Light {
    static ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    static directionalLight1() {
        const light = new THREE.DirectionalLight(0xffffff, 0.5)
        light.position.x = 0
        light.position.y = 0
        light.position.z = -2
        light.position.normalize()

        return light
    }

    static directionalLight2() {
        const light = new THREE.DirectionalLight(0xffffff, 0.25)
        light.position.x = 2
        light.position.y = 0
        light.position.z = 0
        light.position.normalize()
        return light
    }
}

class Helper {
    static gridHelper = new THREE.GridHelper(1, 10, 0x555555, 0xbcbcbc)
    static axesHelper = new THREE.AxesHelper(0.1)
}

class Camera {
    static getOrthographicCamera(width, height) {
        var camera = new THREE.OrthographicCamera(
            width / -3,
            width / 3,
            height / 3,
            height / -3,
            1, 10)
        camera.zoom = 150
        camera.position.z = 4
        return camera
    }
}

class Controller {
    static getOrbitControl(camera, canvas) {
        var controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.screenSpacePanning = true
        controls.minDistance = 1
        controls.maxDistance = 50
        controls.maxPolarAngle = Math.PI / 2
        controls.autoRotate = false
        controls.autoRotateSpeed = 5

        return controls
    }
}

class Renderer {
    static getDefaultRenderer(window, width, height) {
        var renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor('#ffffff')
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(width, height)

        return renderer
    }
}
class Style {
    static canvasStyle = {
        width: '400px',
        height: '400px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}

export { Material, Geometry, Light, Helper, Camera, Controller, Style, Renderer }