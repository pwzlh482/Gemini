/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Activity, 
  Cpu, 
  Database, 
  Download, 
  Layers, 
  Leaf, 
  Monitor, 
  Network, 
  RefreshCw, 
  TrendingUp, 
  Wheat, 
  Wind 
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const mockData = [
  { round: 1, accuracy: 0.45, loss: 1.2 },
  { round: 10, accuracy: 0.62, loss: 0.85 },
  { round: 20, accuracy: 0.75, loss: 0.62 },
  { round: 30, accuracy: 0.81, loss: 0.48 },
  { round: 40, accuracy: 0.88, loss: 0.35 },
  { round: 50, accuracy: 0.92, loss: 0.28 },
  { round: 60, accuracy: 0.94, loss: 0.22 },
  { round: 70, accuracy: 0.95, loss: 0.18 },
  { round: 80, accuracy: 0.96, loss: 0.15 },
  { round: 90, accuracy: 0.97, loss: 0.12 },
  { round: 100, accuracy: 0.98, loss: 0.10 },
];

const cropStats = [
  { name: 'Wheat', count: 1240, color: '#FACC15', icon: Wheat },
  { name: 'Rice', count: 980, color: '#22C55E', icon: Leaf },
  { name: 'Maize/Corn', count: 1120, color: '#F97316', icon: Wind },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'datasets' | 'nodes'>('metrics');

  return (
    <div className="min-h-screen tech-grid p-6 bg-[#0C0D0E]">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 border-b border-[#2A2D30] pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
            <Activity className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Crop FL Dashboard</h1>
            <p className="text-sm text-[#8E9299] font-mono">Status: FEDPROX-V2 RUNNING // ROUND 84</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#16181A] border border-[#2A2D30] rounded-lg text-sm font-medium hover:bg-[#1C1E21] transition-colors">
            <RefreshCw className="w-4 h-4" />
            Sync Nodes
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-sm font-bold shadow-lg shadow-green-900/20 hover:bg-green-500 transition-colors">
            <Download className="w-4 h-4 font-bold" />
            Export Weights
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-4">
          {[
            { id: 'metrics', label: 'Global Metrics', icon: Layers },
            { id: 'datasets', label: 'Dataset Manager', icon: Database },
            { id: 'nodes', label: 'Edge Clients', icon: Network },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200",
                activeTab === item.id 
                  ? "bg-green-500/5 border-green-500/30 text-green-500" 
                  : "bg-[#16181A] border-[#2A2D30] text-[#8E9299] hover:border-[#3F4349]"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          <div className="p-4 bg-[#16181A] border border-[#2A2D30] rounded-xl mt-8">
            <h3 className="text-xs uppercase tracking-widest text-[#8E9299] font-bold mb-4">System Specs</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5C6166]">Optimizer</span>
                <span className="text-xs font-mono text-green-500">FedProx-V2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5C6166]">Regularization</span>
                <span className="text-xs font-mono">mu=0.01</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5C6166]">Clients</span>
                <span className="text-xs font-mono">20 Active</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="lg:col-span-3 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cropStats.map((crop) => (
              <motion.div 
                whileHover={{ y: -2 }}
                key={crop.name} 
                className="p-5 glass-panel rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${crop.color}15`, color: crop.color }}>
                    <crop.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8E9299]">{crop.name}</p>
                    <p className="text-2xl font-bold font-mono">{crop.count.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#22C55E] bg-green-500/10 px-2 py-0.5 rounded-full font-bold">+12.4%</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold">Convergence Curve</h2>
                <p className="text-sm text-[#8E9299]">Global Accuracy across federated rounds</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[#2A2D30] rounded-md">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Accuracy</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D30" vertical={false} />
                  <XAxis 
                    dataKey="round" 
                    stroke="#5C6166" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#5C6166" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#16181A', border: '1px solid #2A2D30', borderRadius: '8px' }}
                    itemStyle={{ color: '#22C55E' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#22C55E" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorAcc)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Log / Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Live Feed
              </h3>
              <div className="space-y-4">
                {[
                  { node: 'Client-04', action: 'Aggregation Complete', time: '2s ago', status: 'success' },
                  { node: 'Client-12', action: 'Local SGD Training...', time: '5s ago', status: 'busy' },
                  { node: 'Server', action: 'Weight Update Sent', time: '12s ago', status: 'success' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border-b border-[#2A2D30] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <div>
                      <p className="text-sm font-bold font-mono">{log.node}</p>
                      <p className="text-xs text-[#8E9299]">{log.action}</p>
                    </div>
                    <span className="text-[10px] text-[#5C6166]">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Hardware Optimization
              </h3>
              <p className="text-sm text-[#8E9299] mb-4">
                Global model utilizes <b>ResNet-18</b> with custom <b>GroupNorm</b> layers for improved stability on Non-IID field data.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-black/40 border border-white/5 rounded-lg">
                  <p className="text-[10px] uppercase text-[#5C6166] mb-1">Momentum</p>
                  <p className="text-xl font-bold font-mono">0.9</p>
                </div>
                <div className="p-3 bg-black/40 border border-white/5 rounded-lg">
                  <p className="text-[10px] uppercase text-[#5C6166] mb-1">Weight Decay</p>
                  <p className="text-xl font-bold font-mono">1e-4</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 pt-8 border-t border-[#2A2D30] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#5C6166]">© 2026 PWZLH FEDERATED LEARNING SYSTEMS</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-[#8E9299] hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-xs text-[#8E9299] hover:text-white transition-colors">Security Audit</a>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
