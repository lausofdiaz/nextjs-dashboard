'use client';
export default function AddGmailContactChannels({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-grey-50 flex justify-center items-center">
      <div className=" flex flex-col relative max-w-2xl w-full">
        <button className="text-grey-100 text-xl absolute top-0 right-0 p-4" onClick={() => onClose()}>X</button>
        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
          <div className="mb-5 text-xl text-center font-bold ">Gmail</div>
          <form className=" max-w-2xl w-full">
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full">
                <input className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Ingrese los nombres" />
                <input className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Ingrese el ausnto" />
                <textarea  rows={6} className=" appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Ingrese el mensaje" />
              </div>    
            </div>           
          </form>
          <div className="mb-4">
            <button className="w-full text-white bg-purple-100 p-2 border rounded-2xl hover:bg-white hover:text-purple-100 hover:border hover:border-purple-100">
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
