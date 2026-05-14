const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = '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';
const API_URL = 'integrate.api.nvidia.com';

const callLLM = async (roleName, modelId, systemPrompt, userMessage) => {
  const payload = {
    model: modelId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    temperature: 0.2,
    max_tokens: 2048
  };

  const startTime = Date.now();
  try {
    const res = await fetch(`https://${API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'ExpointADV'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    const latency = Date.now() - startTime;
    
    if (res.ok) {
      return {
        role: roleName,
        model: modelId,
        content: data.choices[0].message.content,
        tokens: data.usage,
        latency_ms: latency,
        success: true
      };
    } else {
      return {
        role: roleName,
        model: modelId,
        error: data,
        latency_ms: latency,
        success: false
      };
    }
  } catch (error) {
    return {
      role: roleName,
      model: modelId,
      error: error.message,
      latency_ms: Date.now() - startTime,
      success: false
    };
  }
};

const runSwarm = async () => {
  console.log('Starting Multi-Agent Routing Test via NVIDIA Build API...');
  const metrics = [];

  // TASK: COM-01 (Cart Store Zustand)
  const taskDesc = `
Project: Expoint ADV Genesis v7
Task: [COM-01] Cart Store (Zustand)
Goal: Create a persistent Zustand store for managing cart items.
Requirements:
1. Must use 'zustand' and 'zustand/middleware' (persist).
2. Store must handle two item types: 'pack' (from catalog) and 'custom' (from calculator).
3. State should include items[], total(), addItem(), removeItem(), clearCart().
4. LocalStorage persistence key: 'expoint_cart_v7'.
`;

  // Step 1: Architect
  console.log('[1/3] Architect is planning...');
  const archResult = await callLLM(
    'Architect',
    'meta/llama-3.3-70b-instruct', // fallback from deepseek-v4-pro which might not be chat model or might have syntax
    'You are a senior Software Architect. Your job is to design the interface and data structures for the requested task. Output ONLY the TypeScript interface definitions and a short bulleted plan. No implementation.',
    taskDesc
  );
  metrics.push(archResult);
  if (!archResult.success) { console.error('Architect failed:', archResult.error); return; }

  console.log(`Architect finished in ${archResult.latency_ms}ms`);

  // Step 2: Engineer
  console.log('[2/3] Engineer is implementing...');
  const engResult = await callLLM(
    'Engineer',
    'meta/llama-3.1-70b-instruct',
    'You are a Senior Frontend Engineer. Your job is to write the implementation code based on the Architect\'s plan and the user\'s task description. Output ONLY valid TypeScript code in a markdown block. Do not provide explanations.',
    `Task: ${taskDesc}\n\nArchitect's Plan:\n${archResult.content}`
  );
  metrics.push(engResult);
  if (!engResult.success) { console.error('Engineer failed:', engResult.error); return; }

  console.log(`Engineer finished in ${engResult.latency_ms}ms`);

  // Step 3: Reviewer
  console.log('[3/3] Reviewer is verifying...');
  const revResult = await callLLM(
    'Reviewer',
    'meta/llama-3.1-8b-instruct',
    'You are a strict Code Reviewer and Security Auditor. Review the provided code against the Task Requirements. Reply with exactly "PASS" if it meets all criteria perfectly, or "FAIL: <reason>" if it does not.',
    `Task Requirements: ${taskDesc}\n\nCode Implementation:\n${engResult.content}`
  );
  metrics.push(revResult);
  if (!revResult.success) { console.error('Reviewer failed:', revResult.error); return; }
  
  console.log(`Reviewer finished in ${revResult.latency_ms}ms`);
  console.log('--- Swarm Execution Completed ---');

  // Save metrics
  fs.writeFileSync(
    path.join(__dirname, '..', 'nvidia_routing_metrics.json'),
    JSON.stringify(metrics, null, 2)
  );

  console.log('Metrics saved to nvidia_routing_metrics.json');
};

runSwarm().catch(console.error);
