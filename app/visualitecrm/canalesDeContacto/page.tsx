'use client';
import React, { Fragment, useState } from "react";
import AddSMSContactChannels from "@/components/forms/AddSMSContactChannels";
import AddGmailContactChannels from "@/components/forms/AddGmailContactChannels";
import {
  ChatBubbleLeftIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  VideoCameraIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

export default function Page() {
  const [showModalSMS, setShowModalSMS] = useState(false);
  const [showModalGmail, setShowModalGmail] = useState(false);
  return (
    <Fragment>
      <div className="flex justify-between items-center p-6 " style={{ marginTop: '11px' }}>
        <h1 className="text-2xl font-bold">Medios de contacto</h1>
      </div>
      <div className="flex justify-center items-center mx-auto max-w-screen-lg" style={{ marginTop: '25px' }}>
        <div style={{ width: '750px' }} className="grid  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 ">      
          <div style={{ width: '180px', height: '140px', display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center' }} className="bg-purple-50 text-center border rounded-lg place-self-center "
            onClick={() => setShowModalGmail(true)}>
            <EnvelopeOpenIcon style={{ width: '65%', height: '65%', marginBottom: '9px' }} className="text-white"></EnvelopeOpenIcon>
            <p className="text-base text-white">Gmail</p>
          </div>
          <div style={{ width: '170px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="bg-purple-50 text-center border rounded-lg place-self-center" >
            <UsersIcon style={{ width: '65%', height: '65%', marginBottom: '9px' }} className="text-white"></UsersIcon>
            <p className="text-base text-white">Meetings</p>
          </div>
          <div style={{ width: '170px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="bg-purple-50 text-center border rounded-lg place-self-center" >
            <ChatBubbleLeftRightIcon style={{ width: '65%', height: '65%', marginBottom: '9px' }} className="text-white"></ChatBubbleLeftRightIcon>
            <p className="text-base text-white">Chat</p>
          </div>
          <div style={{ width: '170px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="bg-purple-50 text-center border rounded-lg place-self-center" >
            <PhoneIcon style={{ width: '65%', height: '65%', marginBottom: '9px' }} className="text-white"></PhoneIcon>
            <p className="text-base text-white">Llamada</p>
          </div>
          <div style={{ width: '170px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="bg-purple-50 text-center border rounded-lg place-self-center">
            <VideoCameraIcon style={{ width: '65%', height: '65%', marginBottom: '9px' }} className="text-white"></VideoCameraIcon>
            <p className="text-base text-white">Videollamada</p>
          </div>
          <div style={{ width: '170px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="bg-purple-50 text-center border rounded-lg place-self-center" onClick={() => setShowModalSMS(true)}>
            <ChatBubbleLeftIcon style={{ width: '65%', height: '65%', marginBottom: '9px' }} className="text-white"></ChatBubbleLeftIcon>
            <p className="text-base text-white">SMS</p>
          </div>
          <div style={{ width: '170px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="bg-purple-50 text-center border rounded-lg place-self-center md:col-span-3" >
            <PaperAirplaneIcon style={{ width: '65%', height: '65%', marginBottom: '9px' }} className="text-white"></PaperAirplaneIcon>
            <p className="text-base text-white">WhatsApp</p>
          </div>
        </div>
      </div>
      <AddGmailContactChannels isVisible={showModalGmail} onClose={() => setShowModalGmail(false)} />
      <AddSMSContactChannels isVisible={showModalSMS} onClose={() => setShowModalSMS(false)} />
    </Fragment>
  );
}


