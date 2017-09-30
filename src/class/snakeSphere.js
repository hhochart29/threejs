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

    draw() {
        const geometry = new THREE.SphereGeometry(this.radius, this.widthSegments, this.heightSegments);
        const material = new THREE.MeshPhongMaterial(
            {
                color: this.color,
                specular: 'white'
            });
        const snake = new THREE.Mesh(geometry, material);
        snake.castShadow = true;
        // Ou sur le groupe : group.traverse(e => (e.castshadow = true));
        snake.position.set(this.x, this.y, this.z);
        return snake;
    }

    drawEye() {
        const geometry = new THREE.SphereGeometry(0.2, 10, 10);
        const material = new THREE.MeshBasicMaterial(
            {
                color: 'red',
            });

        const eyeGroup = new THREE.Group();
        const lefteye = new THREE.Mesh(geometry, material);
        lefteye.position.set(-0.7, 1.3, -0.4);
        const righteye = lefteye.clone();
        righteye.position.set(-0.7, 1.3, 0.4);

        eyeGroup.add(lefteye);
        eyeGroup.add(righteye);
        return eyeGroup;
    }

}

export default snakeSphere;