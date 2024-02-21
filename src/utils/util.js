function getSceneStatus(status) {
  return status === 0 ? 'active' : (status > 0 ? 'down' : 'up');
}

export {
  getSceneStatus
};
