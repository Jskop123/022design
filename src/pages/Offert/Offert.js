import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Offert.module.css'

import room from '../../assets/room.jpg'
import project from '../../assets/project.jpg'
import camera from '../../assets/camera.jpg'

const Offert = () => (
    <div className={`page ${styles.offer}`}>
        <div className={styles.item}>
            <div className={styles.graph}>
                <img src={project} alt='project icon'/>
            </div>
            <div className={styles.text}>
                <h2>Projekt</h2>
                <p>To lubimy robić najbardziej. Pełny kompleksowy projekt wnętrz na który składa się inwentaryzajcja, aranżacje, wizualizacje, rysunki techniczne i lista zakupów.</p>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.text}>
                <h2>Wizualizacja</h2>
                <p>Możemy stworzyć same wizualizacje jeśli masz już gotowy projekt. Tworzymy zarówno ujęcia statyczne jak i panoramy&nbsp;3D.</p>
            </div>
            <div className={styles.graph}>
                <img src={room} alt='room 3D icon'/>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.graph}>
                <img src={camera} alt='camera icon'/>
            </div>
            <div className={styles.text}>
                <h2>Sesja fotograficzna</h2>
                <p>Chcesz wynająć lokal i potrzebujesz zdjęć? A może po prostu chcesz pochwalić się znajomym swoim wnętrzem? Zrobimy profesjonalną sesje!</p>
            </div>
        </div>
        <Link to='/kontakt'>Kontakt<i className='icon-right-big'/></Link>
    </div>
)
export default Offert