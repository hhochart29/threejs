import * as THREE from 'three';

class snakeSphere {

    constructor(widthSegments, heightSegments, radius, x, y, z, color) {
        this.widthSegments = widthSegments;
        this.heightSegments = heightSegments;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
    }

    //TODO: change 1 material for MeshNormalMaterial //CF Doc

    draw() {
        const geometry = new THREE.SphereGeometry(this.radius, this.widthSegments, this.heightSegments, );
        // const material = new THREE.MeshBasicMaterial(
        //     {
        //         color: this.color
        //     });
        const material = new THREE.MeshNormalMaterial();
        const snake = new THREE.Mesh(geometry, material);
        snake.position.set(this.x, this.y, this.z);
        return snake;
    }

    drawEye() {
        const geometry = new THREE.SphereGeometry(0.2, 10, 10);
        const material = new THREE.MeshBasicMaterial(
            {
                color: 'red'
            });

        const eyeGroup = new THREE.Group();
        const lefteye = new THREE.Mesh(geometry, material);
        lefteye.position.set(-0.7, 0.4, -0.4);
        const righteye = lefteye.clone();
        righteye.position.set(-0.7, 0.4, 0.4);

        eyeGroup.add(lefteye);
        eyeGroup.add(righteye);
        return eyeGroup;
    }

}

export default snakeSphere;