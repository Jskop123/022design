import React, { Component } from 'react';
import styles from './Logo.module.css';

const Logo = () => (
  <div className={styles.parentLogo}>
    <span className={styles.logoAnimation}>
      <h1>0</h1>
      <h1>2</h1>
      <h1>2</h1>
      <h1>.</h1>
    </span>
  </div>
)

export default Logo;
