'use strict';
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { ViroARScene, Viro3DObject, ViroSpotLight, ViroQuad, ViroNode,  ViroConstants} from 'react-viro';

var createReactClass = require('create-react-class');

var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      hasARInitialized : false,
      text : "Initializing AR...",
    };
  },
  render: function() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}> 
        <ViroSpotLight
            innerAngle={5}
            outerAngle={90}
            direction={[0,-1,-.2]}
            position={[0, 3, 1]}
            color="#aaaaaa"
            castsShadow={true}
            />
        <ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0,-1,-.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />

          <Viro3DObject //acá se llaman los archivos que se van a agregar a la escena
               source={require('./res/cubo2/cubo2.obj')}
               position={[0, 0, 0]}
               scale={[.2, .2, .2]}
               type="OBJ"
               lightReceivingBitMask={5}
               shadowCastingBitMask={4}
             resources={[require('./res/cubo2/cubo2.mtl'),]}/>

          <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={2} />

        </ViroNode>
      </ViroARScene>
    );
  },
    _onTrackingUpdated(state, reason) {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (!this.state.hasARInitialized && state == ViroConstants.TRACKING_NORMAL) {
        this.setState({
            hasARInitialized : true,
            text : "Hello World!"
        });
        }
    }
    });

    var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    });
    

module.exports = HelloWorldSceneAR;