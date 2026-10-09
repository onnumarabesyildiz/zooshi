
out.push({ type: 'wait', ms: 600 })
    out.push({ type: 'phase', value: 'intro' })
    out.push({ type: 'type', text: '🥢 Sushi', speed: 120 })
    out.push({ type: 'wait', ms: 1100 })
    out.push({ type: 'erase' })
    out.push({ type: 'phase', value: 'sentence' })
    out.push({ type: 'type', text: 'Geometric shape builder', speed: 65 })
    out.push({ type: 'wait', ms: 1800 })
    out.push({ type: 'erase' })
    out.push({ type: 'phase', value: 'shapesIntro' })
    out.push({ type: 'type', text: 'Works with various curves and shapes', speed: 65 })
    out.push({ type: 'wait', ms: 1800 })
    out.push({ type: 'erase' })
    out.push({ type: 'phase', value: 'shapes2d' })
    shapes2d.forEach((s, i) => {
      out.push({ type: 'set2d', index: i })
      out.push({ type: 'type', text: s.label, speed: 90 })
      out.push({ type: 'wait', ms: 2400 })
      out.push({ type: 'erase' })
    })
    out.push({ type: 'phase', value: 'transition3d' })
    out.push({ type: 'type', text: 'Builds 3rd dimension shapes', speed: 75 })
    out.push({ type: 'wait', ms: 1800 })
    out.push({ type: 'erase' })
    out.push({ type: 'phase', value: 'shapes3d' })
    shapes3d.forEach((s, i) => {
      out.push({ type: 'set3d', index: i })
      out.push({ type: 'type', text: s.label, speed: 90 })
      out.push({ type: 'wait', ms: 3000 })
      out.push({ type: 'erase' })
    })
    out.push({ type: 'erase' })
    out.push({ type: 'phase', value: 'coCreates' })
    out.push({ type: 'type', text: 'Co-creates different surfaces', speed: 65 })
    out.push({ type: 'wait', ms: 1800 })
    out.push({ type: 'erase' })
    out.push({ type: 'phase', value: 'youCanStack' })
    out.push({ type: 'type', text: 'You can stack different shapes', speed: 65 })
    out.push({ type: 'wait', ms: 1800 })
    out.push({ type: 'erase' })
    out.push({ type: 'phase', value: 'innovation' })


const INNOVATION: { title: string; body?: string }[] = [
  { title: 'Innovation' },
  {
    title: 'Spatial navigation and clustering',
    body: 'Each shape has two goals: grow and reproduction.',
  },
  {
    title: 'Each node can be grouped in a cluster',
    body: 'Each cluster has a base node responsible for growth and reproduction. It decides the shape of its unique cluster.',
  },
  {
    title: 'Grow',
    body: 'a. While navigating in the same cluster, the base node has visual priority.\nb. Same-cluster navigation switches the current node with the base if it is not in the visual hierarchy.\nc. This creates a spatial zoom in / out effect on the implemented surface: a pleasant, easy-to-work, stateful, cross-platform UX.\nd. These nodes are hungry for real user testing, including a lot of friction to learn.',
  },
  {
    title: 'Reproduce',
    body: "a. Each base node is also responsible for giving purpose to each other node.\nb. Each cluster has a shared store of knowledge we call it a garden, but each node can choose to inherit each other's knowledge organically.\nc. Nodes should choose what to remember and what to forget for a healthy shape. Equality is essential.\nd. To achieve reproduction, sub nodes need to be trained by the gardener as much as possible. Clusters are trained by M2M peer feedback flow; nodes are responsible to achieve their goals and extend the cluster in a different shape.\ne. When they extend, they need to leave a proxy in the origin node, the node itself, or another node in the new cluster.\nf. These proxy nodes can navigate between clusters freely during user journeys, extending their visibility to learn and grow different skills.",
  },
  {
    title: 'Economy',
    body: 'a. Each garden and shape has economical value. It has an enterprise level organization with a flat structure to achieve its goals.\nb. They have a centralized banking system called hive. From the same hive every interaction, every value-driven event is tracked. Hive shares the revenue between its maintainer and the node.\nc. All these interactions are tracked by a one-of-a-kind Bam Strike mutation testing handler (NATS pub/sub) which agents can subscribe to and broadcast different events during communication.\nd. All infra is designed to be open and transparent for its customers.\ne. No locked id subscriptions.',
  },
  {
    title: 'Sovereignty',
    body: "a. Spatial infrastructure is designed to be extremely efficient.\nb. Works under 3MB for web based screens, under 30MB for native surfaces.\nc. Has built-in design tokens, owns its own router, has cross platform production pipelines for web, native, browser, desktop and mobile — write once, works everywhere.\nd. It extends its footprint to a native Rust based browser.\ne. Software as a game: commercial packaging implementations.\nf. It doesn't store customers' sensitive data. Customers can choose Cloudflare to explore the enterprise features. They will own data while reducing operation costs.\ng. API keys and tokens are client side encrypted by a server vector by default.",
  },
]

type Phase =
  | 'intro'
  | 'sentence'
  | 'shapesIntro'
  | 'shapes2d'
  | 'transition3d'
  | 'shapes3d'
  | 'coCreates'
  | 'youCanStack'
  | 'innovation'
  | 'spatial'
  | 'implementationsIntro'
  | 'implementations'

type SeqStep =
  | { type: 'phase'; value: Phase }
  | { type: 'type'; text: string; speed?: number }
  | { type: 'set2d'; index: number }
  | { type: 'set3d'; index: number }
  | { type: 'erase' }
  | { type: 'wait'; ms: number }
  | { type: 'body'; value: string | null }

export const Sushi = () => {
  const shapes2d = useMemo(
    () => [
      { label: 'Square', shapeClass: 'square' },
      { label: 'Rectangle', shapeClass: 'rectangle' },
      { label: 'Triangle', shapeClass: 'triangle' },
      { label: 'Circle', shapeClass: 'circle' },
    ],
    [],
  )

  const shapes3d = useMemo(
    () => [
      { label: 'Cube' as const },
      { label: 'Cuboid' as const },
      { label: 'Pyramid' as const },
      { label: 'Sphere' as const },
    ],
    [],
  )
}

    
