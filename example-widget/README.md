# Pipeline Graph Widget

*(Example documentation)*

## Overview

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet lacinia tristique. Aliquam id luctus elit. Aliquam non orci et est bibendum aliquet. Nulla interdum lectus eget libero sollicitudin, vel elementum nisl dapibus. Fusce consequat dolor ut tortor sagittis, a volutpat est aliquam. Aenean maximus odio eu turpis scelerisque faucibus. Vestibulum bibendum egestas est, sit amet suscipit ipsum congue a. Maecenas non lectus sit amet metus viverra euismod.

## Contents

 * [Data Models](#data-models)
   * [stages](#data-models-stages)
   * [selectedStage](#data-models-selectedStage)
 * [Services](#services)
 * [Host Events](#host-events)
   * [trafficStateChanged](#host-events-trafficStateChanged)
 * [User Events](#user-events)
   * [onNodeClick](#user-events-onNodeClick)
 * [Types](#types)
   * [StageInfo](#types-StageInfo)
   * [Result](#types-Result)
   * [StageType](#types-StageType)

---

<a name="data-models"></a>
## Data Models

<a name="data-models-stages"></a>
### stages

> List of top-level stages for a Pipeline.

Array of [StageInfo](#types-StageInfo)

<a name="data-models-selectedStage"></a>
### selectedStage

> Currently selected Stage

(Optional) [StageInfo](#types-StageInfo)

---

<a name="services"></a>
## Services

---

<a name="host-events"></a>
## Host Events

<a name="host-events-trafficStateChanged"></a>
### trafficStateChanged

> Fired when the state of the traffic light signal changes

Signal of [TrafficState](#types-TrafficState)

---
<a name="user-events"></a>
## User Events

<a name="user-events-onNodeClick"></a>
### onNodeClick

> Called when the user clicks on a node.

| Parameter | Type | Description |
|-----------|------|-------------|
| nodeName | string |
| id | number |

---

<a name="types"></a>
## Types

<a name="types-StageInfo"></a>
### StageInfo - Object

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet convallis ultrices. Mauris molestie quis velit a blandit.

| Property | Type | Description |
|----------|------|-------------|
|name             | string | 
|title            | string |
|state            | [Result](#types-Result) |
|completePercent  | number | Foo bar baz
|id               | number |
|type             | [StageType](#types-StageType) |
|children         | Array of [StageInfo](#types-StageInfo) | Useful Info
|nextSibling      | (optional) [StageInfo](#types-StageInfo) | Quux

<a name="types-Result"></a>
### Result - Enum

> Describes the current state and/or result of a Stage or Run

| Key | Value | Description |
|-----|-------|---------|
| success   | success   |
| failure   | failure   |
| running   | running   |
| queued    | queued    |
| paused    | paused    |
| unstable  | unstable  |
| aborted   | aborted   |
| not_built | not_built | May be pending, or job was ended before this point |
| skipped   | skipped   | excluded via pipeline "when" clause |
| unknown   | unknown   | bad data or client code needs updating for new values |

<a name="types-TrafficState"></a>
### TrafficState - Enum

> Describes a traffic light

| Key | Value | Description |
|-----|-------|-------------|
| red | red | Stop |
| yellow | yellow | Step on it |
| green | green | Honk horn at car in front |
| off | off | Break open the heads of your neighbours and feast on the goo inside |

<a name="types-StageType"></a>
### StageType - Enum

> Lorem Ipsum dolor sit amet

| Key | Value | Description |
|-----|-------|-------------|
| ken | 1 | Shoryuken |
| ryu | 2 | Hadouken |
| guile | 3 | Sonic Boom |
| sagat | 99 | Tiger Uppercut |