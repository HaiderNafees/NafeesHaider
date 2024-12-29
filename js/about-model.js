function initAboutModel() {
    const container = document.getElementById('about-3d-model');
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    function createWorkspace() {
        const group = new THREE.Group();

        // Laptop
        const laptopGroup = new THREE.Group();
        
        // Laptop Base
        const baseGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
        const laptopMaterial = new THREE.MeshPhongMaterial({
            color: 0x2c3e50,
            shininess: 100
        });
        const base = new THREE.Mesh(baseGeometry, laptopMaterial);
        laptopGroup.add(base);

        // Laptop Screen
        const screenGeometry = new THREE.BoxGeometry(2, 1.3, 0.1);
        const screenMaterial = new THREE.MeshPhongMaterial({
            color: 0x34495e,
            shininess: 100
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 0.7;
        screen.position.z = -0.7;
        screen.rotation.x = -0.3;
        laptopGroup.add(screen);

        // Screen Content (Code Pattern)
        const codeGeometry = new THREE.PlaneGeometry(1.8, 1.1);
        const codeMaterial = new THREE.MeshBasicMaterial({
            color: 0x4f46e5,
            emissive: 0x4f46e5,
            emissiveIntensity: 0.5
        });
        const codeScreen = new THREE.Mesh(codeGeometry, codeMaterial);
        codeScreen.position.y = 0.7;
        codeScreen.position.z = -0.65;
        codeScreen.rotation.x = -0.3;
        laptopGroup.add(codeScreen);

        // Coffee Cup
        const cupGroup = new THREE.Group();
        
        // Cup Body
        const cupGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.4, 32);
        const cupMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 100
        });
        const cup = new THREE.Mesh(cupGeometry, cupMaterial);
        cupGroup.add(cup);

        // Coffee Surface
        const coffeeGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 32);
        const coffeeMaterial = new THREE.MeshPhongMaterial({
            color: 0x4b3621,
            shininess: 50
        });
        const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
        coffee.position.y = 0.15;
        cupGroup.add(coffee);

        cupGroup.position.set(-1.2, 0.2, 0.3);
        
        // Floating Elements
        const elements = [];
        const shapes = [
            new THREE.IcosahedronGeometry(0.15),
            new THREE.TorusGeometry(0.1, 0.05, 16, 100),
            new THREE.OctahedronGeometry(0.15),
            new THREE.TetrahedronGeometry(0.15)
        ];

        const elementMaterial = new THREE.MeshPhongMaterial({
            color: 0x4f46e5,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });

        for (let i = 0; i < 6; i++) {
            const shape = shapes[i % shapes.length];
            const element = new THREE.Mesh(shape, elementMaterial);
            element.position.set(
                (Math.random() - 0.5) * 3,
                Math.random() * 2 + 1,
                (Math.random() - 0.5) * 2
            );
            element.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            elements.push(element);
            group.add(element);
        }

        // Add all components to main group
        group.add(laptopGroup);
        group.add(cupGroup);

        // Store elements for animation
        group.userData.elements = elements;
        
        return group;
    }

    const workspace = createWorkspace();
    scene.add(workspace);

    // Lights
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x4f46e5, 2);
    blueLight.position.set(-5, 3, -5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x9f7aea, 2);
    purpleLight.position.set(5, 3, -5);
    scene.add(purpleLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Gentle floating animation for the whole workspace
        workspace.position.y = Math.sin(time * 0.5) * 0.1;
        workspace.rotation.y = Math.sin(time * 0.3) * 0.1;

        // Animate floating elements
        workspace.userData.elements.forEach((element, index) => {
            element.rotation.x += 0.01;
            element.rotation.y += 0.01;
            element.position.y += Math.sin(time + index) * 0.002;
        });

        renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', () => isDragging = true);
    container.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mouseleave', () => isDragging = false);

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
        const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

        if (isDragging) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };

            workspace.rotation.y += deltaMove.x * 0.005;
            workspace.rotation.x += deltaMove.y * 0.005;
        } else {
            // Subtle movement on hover
            const targetRotationY = mouseX * 0.2;
            const targetRotationX = mouseY * 0.2;
            
            workspace.rotation.y += (targetRotationY - workspace.rotation.y) * 0.05;
            workspace.rotation.x += (targetRotationX - workspace.rotation.x) * 0.05;
        }

        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });

    // Start animation
    animate();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAboutModel); 