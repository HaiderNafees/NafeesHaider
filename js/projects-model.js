let projectsModelInitialized = false;

function initProjectsModel() {
    if (projectsModelInitialized) return;
    
    const container = document.getElementById('projects-3d-model');
    if (!container) return;

    projectsModelInitialized = true;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Create floating project showcase
    function createProjectShowcase() {
        const group = new THREE.Group();

        // Central sphere (hub)
        const hubGeometry = new THREE.IcosahedronGeometry(1, 2);
        const hubMaterial = new THREE.MeshPhongMaterial({
            color: 0x4f46e5,
            emissive: 0x2a1f6f,
            emissiveIntensity: 0.5,
            wireframe: true
        });
        const hub = new THREE.Mesh(hubGeometry, hubMaterial);
        group.add(hub);

        // Project cards
        const projects = [
            { name: 'WordPress', color: 0x21759b },
            { name: 'Sweet Delight', color: 0xff6b6b },
            { name: 'Dragon Kombat', color: 0xffd93d },
            { name: 'Neko Coin', color: 0x4ecdc4 }
        ];

        projects.forEach((project, index) => {
            // Card base
            const cardGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
            const cardMaterial = new THREE.MeshPhongMaterial({
                color: project.color,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            const card = new THREE.Mesh(cardGeometry, cardMaterial);

            // Position in circular pattern
            const angle = (index / projects.length) * Math.PI * 2;
            const radius = 2.5;
            card.position.x = Math.cos(angle) * radius;
            card.position.z = Math.sin(angle) * radius;
            card.rotation.y = -angle;

            // Glowing edge
            const edgeGeometry = new THREE.BoxGeometry(1.6, 1.1, 0.12);
            const edgeMaterial = new THREE.MeshPhongMaterial({
                color: project.color,
                emissive: project.color,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.3
            });
            const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
            card.add(edge);

            // Particle system around card
            const particleCount = 50;
            const particleGeometry = new THREE.BufferGeometry();
            const particlePositions = new Float32Array(particleCount * 3);
            const particleMaterial = new THREE.PointsMaterial({
                color: project.color,
                size: 0.05,
                transparent: true,
                opacity: 0.6
            });

            for(let i = 0; i < particleCount; i++) {
                particlePositions[i * 3] = (Math.random() - 0.5) * 2;
                particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2;
                particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            card.add(particles);

            // Energy beam to hub
            const beamPoints = [
                new THREE.Vector3(0, 0, 0),
                card.position
            ];
            const beamGeometry = new THREE.BufferGeometry().setFromPoints(beamPoints);
            const beamMaterial = new THREE.LineBasicMaterial({
                color: project.color,
                transparent: true,
                opacity: 0.3,
                linewidth: 2
            });
            const beam = new THREE.Line(beamGeometry, beamMaterial);
            
            group.add(card);
            group.add(beam);
        });

        return group;
    }

    const projectShowcase = createProjectShowcase();
    scene.add(projectShowcase);

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

    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.005;

        // Rotate entire showcase
        projectShowcase.rotation.y = time * 0.2;

        // Animate individual elements
        projectShowcase.children.forEach((child, index) => {
            if(child instanceof THREE.Mesh) {
                // Float cards
                child.position.y = Math.sin(time * 2 + index) * 0.1;
                
                // Pulse glow
                if(child.children[0]) {
                    child.children[0].material.opacity = 0.3 + Math.sin(time * 3) * 0.1;
                }

                // Animate particles
                if(child.children[1]) {
                    const positions = child.children[1].geometry.attributes.position.array;
                    for(let i = 0; i < positions.length; i += 3) {
                        positions[i] += Math.sin(time * 2 + i) * 0.001;
                        positions[i + 1] += Math.cos(time * 2 + i) * 0.001;
                        positions[i + 2] += Math.sin(time * 2 + i) * 0.001;
                    }
                    child.children[1].geometry.attributes.position.needsUpdate = true;
                }
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

            projectShowcase.rotation.y += deltaMove.x * 0.005;
            projectShowcase.rotation.x += deltaMove.y * 0.005;
        } else {
            // Subtle movement on hover
            const targetRotationX = mouseY * 0.2;
            const targetRotationZ = mouseX * 0.2;
            
            projectShowcase.rotation.x += (targetRotationX - projectShowcase.rotation.x) * 0.05;
            projectShowcase.rotation.z += (targetRotationZ - projectShowcase.rotation.z) * 0.05;
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
document.addEventListener('DOMContentLoaded', () => {
    // Wait a short moment to ensure proper initialization
    setTimeout(initProjectsModel, 100);
});

// Add scroll-based initialization
document.addEventListener('scroll', () => {
    requestAnimationFrame(initProjectsModel);
}); 