import * as THREE from 'three';

class snakeSphere {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        const geometry = new THREE.SphereGeometry(1, 10, 10);
        const material = new THREE.MeshBasicMaterial(
            {
                color: 'red'
            });
        const snake = new THREE.Mesh(geometry, material);
        snake.position.set(5, 0, 0);
        return snake;
    }
}

export default snakeSphere;