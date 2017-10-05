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
        const geometry2 = new THREE.SphereGeometry(0.1, 10, 15);
        const material = new THREE.MeshBasicMaterial(
            {
                color: 'red',
            });
        const material2 = new THREE.MeshBasicMaterial(
            {
                color: 'green',
            });

        const eyeGroup = new THREE.Group();
        const lefteye = new THREE.Mesh(geometry, material);
        const righteye = lefteye.clone();
        lefteye.position.set(-0.7, 1.3, -0.4);
        righteye.position.set(-0.7, 1.3, 0.4);

        const lefteyepup = new THREE.Mesh(geometry2, material2);
        const righteyepup = lefteyepup.clone();
        lefteyepup.position.set(-0.8, 1.33, -0.45);
        righteyepup.position.set(-0.8, 1.33, 0.45);

        eyeGroup.add(lefteye);
        eyeGroup.add(righteye);
        eyeGroup.add(lefteyepup);
        eyeGroup.add(righteyepup);
        eyeGroup.traverse(e => (e.castShadow = true));
        return eyeGroup;
    }

    drawTongue() {
        const geometry = new THREE.ConeGeometry(.1, .5, 3);
        const material = new THREE.MeshBasicMaterial(
            {
                color: 'red'
            });

        const tongueGroup = new THREE.Group();
        let tongueLeft = new THREE.Mesh(geometry, material);
        tongueLeft.position.set(.8, 1.1, -.06);
        let tongueRight = new THREE.Mesh(geometry, material);
        tongueRight.position.set(.8, 1.1, .06);

        tongueGroup.add(tongueLeft, tongueRight);
        tongueGroup.rotation.z = Math.PI / 2;
        tongueGroup.traverse(e => (e.castShadow = true));
        return tongueGroup;
    }

}

export default snakeSphere;