import React, { useEffect } from 'react';

declare var JitsiMeetExternalAPI: any;

const VideoConsultation: React.FC<{ roomName: string }> = ({ roomName }) => { useEffect(() => { const domain = 'https://www.google.com/search?q=jitsi.staqlt-telemed.com'; const options = { roomName: roomName, width: '100%', height: 700, parentNode: document.querySelector('#jitsi-container'), configOverwrite: { startWithAudioMuted: true }, interfaceConfigOverwrite: { FILM_STRIP_MAX_HEIGHT: 120 } }; const api = new JitsiMeetExternalAPI(domain, options);

return () => api.dispose();


}, [roomName]);

return <div id="jitsi-container" style={{ borderRadius: '12px', overflow: 'hidden' }} />; };

export default VideoConsultation;