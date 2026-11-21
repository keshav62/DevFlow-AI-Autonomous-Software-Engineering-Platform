import apiClient from './api-client.js';

export async function getBackendHealth() {
  return apiClient.get('/health');
}

export async function getDatabaseHealth() {
  return apiClient.get('/health/database');
}

export async function getRedisHealth() {
  return apiClient.get('/health/redis');
}
