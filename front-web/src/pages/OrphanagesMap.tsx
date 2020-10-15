import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarker from '../images/map-marker.svg';

import '../styles/pages/orphanage.map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy"></img>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando suas visita</p>
        </header>

        <footer>
          <strong>Ceará</strong>
          <span>Sobral</span>
        </footer>
      </aside>

      <Map
        center={[-3.6899492, -40.3596154]}
        zoom={15}
        style={{
          width: '100%', height: '100%'
        }}>
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {
          orphanages.map(orphanage => {
            return (
              <Marker
                key={orphanage.id}
                position={[orphanage.latitude, orphanage.longitude]}
                icon={mapIcon} >

                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color={"#FFF"} />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }

      </Map>

      <Link className="create-orphanage" to="/orphanages/create">
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  )
}

export default OrphanagesMap;

// mapbox - another tool to work with maps free