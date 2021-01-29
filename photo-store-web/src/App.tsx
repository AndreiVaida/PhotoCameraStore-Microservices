import React, { useState } from 'react';
import './App.css';
import PhotoCamera from "./model/PhotoCamera";
import { SensorSize } from "./model/SensorSize";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const API_URL = "http://localhost:3001";

function App() {
    // Hello message
    const [helloMessage, setHelloMessage] = useState<string>("");
    // All photo cameras
    const [allPhotoCameras, setAllPhotoCameras] = useState<PhotoCamera[]>([]);
    const [showAllCameras, setShowAllCameras] = useState<boolean>(false);
    // Add photo cameras
    const [newCamera, setNewCamera] = useState<PhotoCamera>(new PhotoCamera(0, '', SensorSize.FullFrame));
    const [addCameraMessage, setAddCameraMessage] = useState<string>("");
    // Delete photo cameras
    const [idToDelete, setIdToDelete] = useState<number>(0);
    const [deleteCameraMessage, setDeleteCameraMessage] = useState<string>("");

    function handleGetHello() {
        fetch(`${API_URL}/home`)
            .then(response => response.json())
            .then(data => setHelloMessage(data.title));
    }

    function handleGetAllPhotoCameras() {
        fetch(`${API_URL}/cameras`)
            .then(response => {
                if (!response.ok) throw response;
                return response.json();
            })
            .then(cameras => {
                console.log(cameras);
                setAllPhotoCameras(cameras);
                setShowAllCameras(true);
            })
            .catch(error => {
                console.error(error);
                setShowAllCameras(false);
                alert("Something went wrong :(");
            });
    }

    function handleAddPhotoCameras() {
        fetch(`${API_URL}/cameras`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCamera),
        })
            .then(response => {
                if (!response.ok) throw response;
                return response.json();
            })
            .then(camera => {
                setAddCameraMessage(`Photo camera added with id: ${camera.id}`);
            })
            .catch(error => {
                console.error(error);
                setAddCameraMessage("");
                alert("Something went wrong :(");
            });
    }

    function handleDeletePhotoCameras() {
        fetch(`${API_URL}/cameras/${idToDelete}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) throw response;
                console.log(response);
                return response.text()
            })
            .then(cameraOrNull => {
                if (cameraOrNull.length) {
                    setDeleteCameraMessage(`Photo camera deleted: ${cameraOrNull}`)
                } else {
                    setDeleteCameraMessage(`Photo camera not found.`)
                }
            })
            .catch(error => {
                console.error(error);
                setAddCameraMessage("");
                alert("Something went wrong :(");
            });
    }

    function createPhotoCameraContainer(camera: PhotoCamera) {
        return <div className={"highlight-hover2"} key={'div_for_' + camera.id.toString()}>
            <label className={"highlight-hover3 m-3 code"}>Id: {camera.id}</label>
            <label className={"highlight-hover3 m-3 code"}>Name: {camera.name}</label>
            <label className={"highlight-hover3 m-3 code"}>Sensor: {camera.sensorSize}</label>
        </div>;
    }

    return (
        <div className="App">
            <div className="App-header">
                {/* GET hello */}
                <div className={"m-2 p-5 highlight-hover w-100"}>
                    <button onClick={handleGetHello} className={"btn btn-outline-light big-button"}>GET hello</button>
                    <p>{helloMessage}</p>
                </div>
                {/* GET Photo cameras */}
                <div className={"m-2 p-5 highlight-hover w-100"}>
                    <button onClick={handleGetAllPhotoCameras} className={"btn btn-outline-light big-button"}>GET all photo cameras</button>
                    <div>
                        {
                            showAllCameras ? <label>Found {allPhotoCameras.length} photo cameras:</label> : ''
                        }
                        {
                            allPhotoCameras.map((camera, index) => createPhotoCameraContainer(camera))
                        }
                    </div>
                </div>
                {/* ADD Photo camera */}
                <div className={"m-2 p-5 highlight-hover w-100 bg-success"}>
                    <div>
                        <label>Photo camera Name:</label> <br/>
                        <input type='text' value={newCamera.name} onChange={e => setNewCamera(prev => ({...prev, name: e.target.value}))} className={'w-25 text-center'}/> <br/>
                        <label>Sensor size:</label>

                        <Dropdown options={[SensorSize.FullFrame, SensorSize.APSC, SensorSize.MicroFourThirds]}
                                  onChange={e => setNewCamera(prev => ({...prev, sensorSize: e.value as SensorSize}))}
                                  placeholder="Select an option"
                                  className={'combobox'}/>
                        <button onClick={handleAddPhotoCameras} className={"btn btn-outline-light big-button"}>ADD photo cameras</button>
                        <p>{addCameraMessage}</p>
                    </div>
                </div>
                {/* DELETE Photo camera */}
                <div className={"m-2 p-5 highlight-hover w-100 bg-danger"}>
                    <div>
                        <label>Photo camera id:</label> <br/>
                        <input type='number' value={idToDelete} onChange={e => setIdToDelete(+e.target.value)} className={'w-25'}/> <br/>
                        <button onClick={handleDeletePhotoCameras} className={"btn btn-outline-light big-button"}>DELETE photo cameras</button>
                        <p>{deleteCameraMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
