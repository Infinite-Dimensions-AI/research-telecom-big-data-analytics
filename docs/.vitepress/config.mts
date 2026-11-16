import { defineConfig } from 'vitepress';
export default defineConfig({
  title: 'Telecommunications Big Data Analytics Research',
  description: 'Reconstruct TM Forum-aligned telecommunications analytics across business and operations support: churn, customer lifetime value, influence graphs, proactive service assurance, retention offers, fraud and next-best-action decision systems.',
  base: '/research-telecom-big-data-analytics/',
  cleanUrls: true,
  themeConfig: {
    nav: [{text:'Home',link:'/'},{text:'Experiments',link:'/experiments'},{text:'Live 3D demo',link:'/demo/'},{text:'GitHub',link:'https://github.com/Infinite-Dimensions-AI/research-telecom-big-data-analytics'}],
    sidebar:[{text:'Research',items:[{text:'Introduction',link:'/'},{text:'Research methodology',link:'/methodology'},{text:'Experiments',link:'/experiments'},{text:'Architecture',link:'/architecture'},{text:'Research portal',link:'/portal'},{text:'Contribution and releases',link:'/workflow'}]}],
    socialLinks:[{icon:'github',link:'https://github.com/Infinite-Dimensions-AI/research-telecom-big-data-analytics'}],
    footer:{message:'Public research notes. Synthetic reconstructions are identified explicitly.'}
  }
});
