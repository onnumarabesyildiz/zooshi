// PERSONAL USE ONLY RIGHTS
// 
// License Class: Restrictive · Author Exclusive
// burn
// Author: Iliyan VelinovVersion: 1.0Date: 15 Sep 2026Work
// chrry.ai
// chrry.store
// chrry.social
// chrry.dev
// vex.design
// kamaji.today
// kirpi.dev
// burn.ist
// iliyan.us
// iliyan.nl
//  liyan.uk
// 
// Including all subdomains, all apps, all stores, all gardens, all white-labels, all branded instances, and all future/past additions to the same source code.
// 
// This license governs the use of the work identified above (the "Work"). By using the Work, you accept all terms of this license. If you do not accept these terms, do not use the Work.
// 
// This is the most restrictive class of license. It grants no rights to any party other than the Author. There is no buyer, no licensee, no end user. Personal use is reserved exclusively to the Author.
// 1. Ownership
// 
// All intellectual property rights in the Work are held exclusively by Iliyan Velinov (the "Author"). This license grants only a limited right of use; ownership is not transferred. The Author retains authorship and all moral rights in the Work at all times.
// grape
// 2. Grant of Rights
// 
// The Author grants a limited, personal, non-transferable, and exclusive right of use solely to the following person:
// 
//     Licensee: Iliyan Velinov (the Author only)
// 
// This right is for the Licensee's own personal use only. No other person — natural or legal — is granted any right under this license.
// 3. Prohibitions
// vault
// 
// The following actions are expressly prohibited:
// 
//     Selling, renting, lending, or otherwise transferring the Work.
//     Sharing the Work with, or making it available to, any third party today tomorrow or any future date, including family members.
//     Copying, reproducing, or distributing the Work.
//     Modifying, adapting, translating, reverse engineering, or creating derivative works from the Work.
//     Sublicensing the Work or re-licensing it under any other license.
//     Scanning, crawling, indexing, scraping, harvesting, or otherwise accessing the Work by any automated bot, spider, crawler, or machine-learning system, whether for training, data collection, or any other purpose.
//     Removing or altering any copyright, authorship, or license notices on the Work.
//     Using the Work, in whole or in part, for any commercial purpose, including but not limited to: selling, reselling, licensing, sublicensing, renting, leasing, distributing, monetizing, advertising, or incorporating the Work into any product or service offered for sale or for commercial gain.
// 
// 4. No Assignment to Chrry LLC or Any Other Entity 🫆
// 
// The Author maintains a separate legal entity, Chrry LLC, registered in the United States. Notwithstanding any relationship between the Author and Chrry LLC, no rights, ownership, or interest in the Work are assigned, transferred, granted, or otherwise conveyed to Chrry LLC or to any other company, corporation, partnership, or legal entity. Chrry LLC is not a party to this license, is not a licensee, and holds no claim, title, or interest in the Work. Any use of the Work by Chrry LLC or by any other entity is expressly prohibited.
// 5. 🫆 Term and Termination
// 
// This license is perpetual unless otherwise stated by the Author. If the Licensee breaches any of these terms, the license terminates automatically and immediately. Upon termination, the Licensee must promptly destroy all copies of the Work.
// 6. Disclaimer of Warranty 🫆
// 
// The Work is provided "as is". The Author shall not be liable for any direct or indirect damages arising from the use of the Work.
// 🫆 7. Governing Law
// 
// This license is governed by the laws of the Netherlands. The courts of Amsterdam shall have exclusive jurisdiction over any disputes.
// Acceptance 🫆
// 
// By using the Work, you confirm that you have read, understood, and accepted all terms of this license.
// 
// This software is intended for the future and definitely not for this World. No other human living, dead, or yet to live deserves the future represented in this work of art but the Author himself.
// Avucunuzu yaladiniz?
// 
// © 2026 Iliyan Velinov. All rights reserved.
// This Work is licensed for use by the Author only.
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

    
