function isRecordExpired(createdAt, durationInMin) {
  return (
    Math.floor(
      (new Date().getTime() - new Date(createdAt).getTime()) / 1000 / 60,
    ) > durationInMin
  );
}

module.exports = isRecordExpired;
