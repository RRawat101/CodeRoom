import React from 'react';
import { io } from 'socket.io-client';
import Peer  from 'peerjs';
import { useContext,useEffect } from 'react';
import { CodeEditorContext } from '../provider/codeEditorProvider';
import './userlist.css';



function UserList() {

    const {ROOM_ID,socket} = useContext(CodeEditorContext);
    // console.log(socket.id);

    useEffect(() => {
        const videoGrid = document.getElementById('video-grid');
        const myVideo = document.createElement('video')
        myVideo.muted = true;
        const myPeer = new Peer(undefined, {
          host: 'localhost',
          port: 9000,
          path: '/'
      });
        const peers = {}
        
        function connectToNewUser(userId, stream) {
          const call = myPeer.call(userId, stream)
          const video = document.createElement('video');
          video.setAttribute('style', '{width: 100%; height: 100%; object-fit: cover;}');
          call.on('stream', userVideoStream => {
              addVideoStream(video, userVideoStream)
          })
          call.on('close', () => {
              video.remove();
          })
        
          peers[userId] = call
        }
        
        function addVideoStream(video, stream) {
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
        })
        videoGrid.append(video)
        }
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(stream => {
            addVideoStream(myVideo, stream)
          
            myPeer.on('call', call => {
              call.answer(stream)
              const video = document.createElement('video')
              call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
              })
            })
          
            socket.on('user-connected', userId => {
              connectToNewUser(userId, stream)
            })
          })
          
            socket.on('user-disconnected', userId => {
                if (peers[userId]) peers[userId].close()
            })
          
          myPeer.on('open', id => {
            socket.emit('joinRoom', {roomId:ROOM_ID, userId:id})
          })

    }, []);

    return (
        <div className="user-list">
            <div id="video-grid"></div>
        </div>
    );
}

export default UserList;