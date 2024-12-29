function initSkillsModel() {
    const container = document.getElementById('skills-3d-model');
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Create Brain Network Structure
    function createBrainNetwork() {
        const group = new THREE.Group();
        
        // Brain core (central sphere)
        const coreGeometry = new THREE.IcosahedronGeometry(1, 2);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x4f46e5,
            shininess: 100,
            emissive: 0x2a1f6f,
            emissiveIntensity: 0.3,
            wireframe: true
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        group.add(core);

        // Skill nodes
        const skills = [
            { name: 'HTML', color: 0xe34c26, position: [2, 1.5, 1] },
            { name: 'CSS', color: 0x563d7c, position: [-2, 1.5, 1] },
            { name: 'JavaScript', color: 0xf7df1e, position: [2, -1.5, 1] },
            { name: 'React', color: 0x00d8ff, position: [-2, -1.5, 1] },
            { name: 'WordPress', color: 0x21759b, position: [0, 2, -1] },
            { name: 'PHP', color: 0x777bb4, position: [0, -2, -1] },
            { name: 'Git', color: 0xf05032, position: [1.5, 0, 2] },
            { name: 'Bootstrap', color: 0x7952b3, position: [-1.5, 0, 2] }
        ];

        // Create nodes and connections
        skills.forEach((skill, index) => {
            // Node
            const nodeGeometry = new THREE.SphereGeometry(0.25, 32, 32);
            const nodeMaterial = new THREE.MeshPhongMaterial({
                color: skill.color,
                shininess: 100,
                emissive: skill.color,
                emissiveIntensity: 0.2
            });
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(...skill.position);
            
            // Connection line to core
            const points = [
                new THREE.Vector3(0, 0, 0),
                node.position
            ];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: skill.color,
                transparent: true,
                opacity: 0.3
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            
            // Particle system for connection
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 20;
            const positions = new Float32Array(particleCount * 3);
            
            for(let i = 0; i < particleCount; i++) {
                const t = i / particleCount;
                positions[i * 3] = points[0].x * (1 - t) + points[1].x * t;
                positions[i * 3 + 1] = points[0].y * (1 - t) + points[1].y * t;
                positions[i * 3 + 2] = points[0].z * (1 - t) + points[1].z * t;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                color: skill.color,
                size: 0.05,
                transparent: true,
                opacity: 0.6
            });
            
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            particles.userData = { startPositions: positions.slice() };
            
            group.add(node);
            group.add(line);
            group.add(particles);
        });

        return group;
    }

    const brainNetwork = createBrainNetwork();
    scene.add(brainNetwork);

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

    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.005;

        // Rotate entire network
        brainNetwork.rotation.y = time * 0.5;
        
        // Animate core
        brainNetwork.children[0].rotation.x = time * 0.3;
        brainNetwork.children[0].rotation.y = time * 0.5;

        // Animate particles along connections
        brainNetwork.children.forEach((child) => {
            if (child instanceof THREE.Points) {
                const positions = child.geometry.attributes.position.array;
                const startPositions = child.userData.startPositions;
                
                for(let i = 0; i < positions.length; i += 3) {
                    const offset = Math.sin(time * 2 + i/3) * 0.1;
                    positions[i] = startPositions[i] + offset;
                    positions[i + 1] = startPositions[i + 1] + offset;
                    positions[i + 2] = startPositions[i + 2] + offset;
                }
                
                child.geometry.attributes.position.needsUpdate = true;
            }
            
            // Pulse nodes
            if (child instanceof THREE.Mesh && child !== brainNetwork.children[0]) {
                child.scale.setScalar(1 + Math.sin(time * 3) * 0.1);
            }
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

    // Interactive rotation with mouse
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

            brainNetwork.rotation.y += deltaMove.x * 0.005;
            brainNetwork.rotation.x += deltaMove.y * 0.005;
        } else {
            // Subtle movement on hover
            const targetRotationX = mouseY * 0.2;
            const targetRotationZ = mouseX * 0.2;
            
            brainNetwork.rotation.x += (targetRotationX - brainNetwork.rotation.x) * 0.05;
            brainNetwork.rotation.z += (targetRotationZ - brainNetwork.rotation.z) * 0.05;
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
document.addEventListener('DOMContentLoaded', initSkillsModel); 