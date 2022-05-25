// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { PanelsState } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
// import { defaultPlaybackConfig } from "@foxglove/studio-base/providers/CurrentLayoutProvider/reducers";

/**
 * This is loaded when the user has no layout selected on application launch
 * to avoid presenting the user with a blank layout.
 */
export const defaultLayout: PanelsState =
{
  "configById": {
    "3D Panel!3p86wvb": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 13.214308282046543,
        "perspective": true,
        "phi": 0.2979182916811192,
        "targetOffset": [
          1.9303443154698339,
          0.2070949828456854,
          0
        ],
        "thetaOffset": 7.8344438556671285,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/lc_ve/dynmap",
        "t:/robot"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#808080",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false,
      "followTf": "sensor"
    },
    "3D Panel!7njw9h": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 18.471240794241112,
        "perspective": true,
        "phi": 0.12374835991989458,
        "targetOffset": [
          2.0639289421232747,
          0.5134653893312869,
          0
        ],
        "thetaOffset": 1.5528063904335678,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/lc_ve/vismap",
        "t:/robot"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#000000",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": true,
      "followTf": "sensor"
    },
    "ImageViewPanel!9fxu36": {
      "cameraTopic": "/lc_image",
      "customMarkerTopicOptions": [],
      "enabledMarkerTopics": [],
      "mode": "fit",
      "pan": {
        "x": 0,
        "y": 0
      },
      "rotation": 0,
      "synchronize": false,
      "transformMarkers": true,
      "zoom": 1
    },
    "3D Panel!4820al6": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 18.578490024005834,
        "perspective": true,
        "phi": 0.9393711950629633,
        "targetOffset": [
          -1.512605086511276,
          1.471746447452175,
          0
        ],
        "thetaOffset": -31.396170064083726,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/registered_scan",
        "t:/lc_mesh",
        "t:/lc_dets",
        "t:/robot",
        "t:/dyn_map/gt_dynmap"
      ],
      "clickToPublishPoseTopic": "",
      "clickToPublishPointTopic": "/way_point",
      "clickToPublishPoseEstimateTopic": "",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#000000",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {
        "t:/registered_scan": {
          "colorMode": {
            "mode": "flat",
            "flatColor": {
              "r": 1,
              "g": 1,
              "b": 1,
              "a": 1
            }
          },
          "pointSize": 2
        },
        "t:/lc_cloud": {
          "colorMode": {
            "rgbByteOrder": "bgra",
            "mode": "rgb"
          },
          "pointSize": 1,
          "pointShape": "square"
        },
        "t:/lc_dets": {
          "colorMode": {
            "mode": "gradient",
            "colorField": "intensity",
            "minValue": 0,
            "maxValue": 255,
            "minColor": {
              "r": 0,
              "g": 0,
              "b": 1,
              "a": 1
            },
            "maxColor": {
              "r": 0,
              "g": 1,
              "b": 1,
              "a": 1
            }
          }
        }
      },
      "useThemeBackgroundColor": true
    },
    "3D Panel!4ay60cj": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 16.65189116484585,
        "perspective": true,
        "phi": 0.0373368336614891,
        "targetOffset": [
          2.2268450813672565,
          -0.14714851034001478,
          0
        ],
        "thetaOffset": -4.7023603409481725,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/dyn_map/gt_dynmap",
        "t:/robot"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#808080",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false,
      "followTf": "sensor"
    },
    "3D Panel!w21xy4": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "targetOffset": [
          1.51826627038591,
          -0.32104694838096,
          0
        ],
        "distance": 13.524338169980489,
        "perspective": true,
        "phi": 0.11571309622933273,
        "thetaOffset": -4.717485879062824,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/dyn_map/gt_vismap",
        "t:/robot"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#808080",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false,
      "followTf": "sensor"
    },
    "3D Panel!3m32xd7": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 8.469496558445524,
        "perspective": true,
        "phi": 0,
        "targetOffset": [
          -2.116490906889414,
          4.115808780791842,
          0
        ],
        "thetaOffset": 0.003614918706967416,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/lc_ve/dynmap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#808080",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false
    },
    "ImageViewPanel!bxt24w": {
      "cameraTopic": "/lc_image",
      "customMarkerTopicOptions": [],
      "enabledMarkerTopics": [],
      "mode": "fit",
      "pan": {
        "x": 0,
        "y": 0
      },
      "rotation": 0,
      "synchronize": false,
      "transformMarkers": false,
      "zoom": 1
    },
    "3D Panel!39brp4i": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 31.383508991454484,
        "perspective": true,
        "phi": 0.973208377945937,
        "targetOffset": [
          -2.4347842940691953,
          6.16575366527566,
          0
        ],
        "thetaOffset": -6.258349787566802,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/registered_scan",
        "t:/lc_mesh",
        "t:/lc_dets",
        "t:/dyn_map/gt_dynmap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#000000",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {
        "t:/lc_cloud": {
          "colorMode": {
            "rgbByteOrder": "bgra",
            "mode": "rgb"
          },
          "pointSize": 1,
          "pointShape": "square"
        },
        "t:/registered_scan": {
          "pointSize": 2,
          "colorMode": {
            "mode": "flat",
            "flatColor": {
              "r": 1,
              "g": 1,
              "b": 1,
              "a": 1
            }
          }
        },
        "t:/lc_dets": {
          "colorMode": {
            "mode": "gradient",
            "colorField": "intensity",
            "minValue": 0,
            "maxValue": 255,
            "minColor": {
              "r": 0,
              "g": 0,
              "b": 1,
              "a": 1
            },
            "maxColor": {
              "r": 0,
              "g": 1,
              "b": 1,
              "a": 1
            }
          }
        }
      },
      "useThemeBackgroundColor": true
    },
    "Plot!2wjoy1g": {
      "paths": [
        {
          "value": "/lc_ve/tsflog.error_absolute",
          "enabled": true,
          "timestampMethod": "receiveTime"
        },
        {
          "value": "/lc_ve/tsflog.true_interval",
          "enabled": true,
          "timestampMethod": "receiveTime"
        }
      ],
      "minYValue": "",
      "maxYValue": "",
      "showXAxisLabels": true,
      "showYAxisLabels": true,
      "showLegend": false,
      "legendDisplay": "floating",
      "showPlotValuesInLegend": false,
      "isSynced": true,
      "xAxisVal": "timestamp",
      "sidebarDimension": 240,
      "title": "RED: Observed intervals. BLUE: Error in forecasting intervals (ms)",
      "followingViewWidth": 0
    },
    "Plot!1vmemdl": {
      "paths": [
        {
          "value": "/lc_ve/tsflog.error_relative",
          "enabled": true,
          "timestampMethod": "receiveTime"
        }
      ],
      "minYValue": 1,
      "maxYValue": 0,
      "showXAxisLabels": true,
      "showYAxisLabels": true,
      "showLegend": false,
      "legendDisplay": "floating",
      "showPlotValuesInLegend": false,
      "isSynced": true,
      "xAxisVal": "timestamp",
      "sidebarDimension": 240,
      "title": "Relative error in forecasting intervals"
    },
    "3D Panel!19iv51e": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 11.992313643052455,
        "perspective": true,
        "phi": 0.2847050377265533,
        "targetOffset": [
          -2.3875925897484813,
          3.4381993102556723,
          0
        ],
        "thetaOffset": -0.03869633187575043,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/lc_ve/dynmap",
        "t:/robot"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.26179939,
      "customBackgroundColor": "#7d7d7d",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false,
      "colorOverrideByVariable": {}
    },
    "3D Panel!1hyomy9": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 11.992313643052455,
        "perspective": true,
        "phi": 0.3954655944024172,
        "targetOffset": [
          -2.2272977792519697,
          2.53889731925378,
          0
        ],
        "thetaOffset": 0.005858123569793959,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/robot",
        "t:/dyn_map/gt_dynmap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.26179939,
      "customBackgroundColor": "#7d7d7d",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false,
      "colorOverrideByVariable": {}
    },
    "3D Panel!4kvigfx": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 20.502702304601673,
        "perspective": true,
        "phi": 0.20301348136399677,
        "targetOffset": [
          -2.0145992193130526,
          2.6542326136316974,
          0
        ],
        "thetaOffset": 0.0000471651023939805,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/robot",
        "t:/lc_ve/vismap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.26179939,
      "customBackgroundColor": "#000000",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": true
    },
    "3D Panel!1cekpsz": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 20.974631513659006,
        "perspective": true,
        "phi": 0.20301348136399677,
        "targetOffset": [
          -2.0145992193130526,
          2.6542326136316974,
          0
        ],
        "thetaOffset": 0.0000471651023939805,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/robot",
        "t:/dyn_map/gt_vismap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.26179939,
      "customBackgroundColor": "#7d7d7d",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false,
      "colorOverrideByVariable": {}
    },
    "3D Panel!2dz9hrf": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 7.55860109771245,
        "perspective": true,
        "phi": 0,
        "targetOffset": [
          -2.641469897245401,
          2.4963719261238824,
          0
        ],
        "thetaOffset": 0.05340342532907777,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/registered_scan",
        "t:/lc_dets",
        "t:/lc_mesh",
        "t:/robot"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.26179939,
      "customBackgroundColor": "#000000",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {
        "t:/registered_scan": {
          "colorMode": {
            "mode": "flat",
            "flatColor": {
              "r": 1,
              "g": 1,
              "b": 1,
              "a": 1
            }
          }
        },
        "t:/lc_dets": {
          "colorMode": {
            "mode": "gradient",
            "colorField": "intensity",
            "minColor": {
              "r": 0,
              "g": 0,
              "b": 1,
              "a": 1
            },
            "maxColor": {
              "r": 0,
              "g": 1,
              "b": 1,
              "a": 1
            }
          }
        }
      },
      "useThemeBackgroundColor": true
    },
    "Plot!4df13ra": {
      "paths": [
        {
          "value": "/lc_ve/metrics.occ_recall",
          "enabled": false,
          "timestampMethod": "receiveTime"
        },
        {
          "value": "/lc_ve/metrics.occ_f1score",
          "enabled": false,
          "timestampMethod": "receiveTime"
        },
        {
          "value": "/lc_ve/metrics.occ_iou",
          "enabled": true,
          "timestampMethod": "receiveTime"
        },
        {
          "value": "/lc_ve/metrics.fcast_interval",
          "enabled": true,
          "timestampMethod": "receiveTime"
        }
      ],
      "minYValue": "",
      "maxYValue": "",
      "showXAxisLabels": true,
      "showYAxisLabels": true,
      "showLegend": true,
      "legendDisplay": "floating",
      "showPlotValuesInLegend": true,
      "isSynced": true,
      "xAxisVal": "timestamp",
      "sidebarDimension": 240
    },
    "Tab!lb68hr": {
      "activeTabIdx": 0,
      "tabs": [
        {
          "title": "With GT",
          "layout": {
            "direction": "row",
            "first": {
              "first": "3D Panel!3p86wvb",
              "second": "3D Panel!7njw9h",
              "direction": "column",
              "splitPercentage": 47.681400564276935
            },
            "second": {
              "first": {
                "first": "ImageViewPanel!9fxu36",
                "second": "3D Panel!4820al6",
                "direction": "column",
                "splitPercentage": 27.77255299139116
              },
              "second": {
                "first": "3D Panel!4ay60cj",
                "second": "3D Panel!w21xy4",
                "direction": "column",
                "splitPercentage": 49.41860465116279
              },
              "direction": "row",
              "splitPercentage": 56.77302829620711
            },
            "splitPercentage": 34.26343865408289
          }
        },
        {
          "title": "Hugging",
          "layout": {
            "first": {
              "first": "3D Panel!3m32xd7",
              "second": "ImageViewPanel!bxt24w",
              "direction": "column",
              "splitPercentage": 45.24422320898267
            },
            "second": {
              "first": "3D Panel!39brp4i",
              "second": {
                "first": "Plot!2wjoy1g",
                "second": "Plot!1vmemdl",
                "direction": "column"
              },
              "direction": "row",
              "splitPercentage": 54.79396715600478
            },
            "direction": "row",
            "splitPercentage": 31.83082915971063
          }
        },
        {
          "title": "Metrics",
          "layout": {
            "first": {
              "first": "3D Panel!19iv51e",
              "second": "3D Panel!1hyomy9",
              "direction": "column",
              "splitPercentage": 47.02319183338562
            },
            "second": {
              "first": {
                "first": {
                  "first": "3D Panel!4kvigfx",
                  "second": "3D Panel!1cekpsz",
                  "direction": "row"
                },
                "second": "3D Panel!2dz9hrf",
                "direction": "column",
                "splitPercentage": 57.29420566160678
              },
              "second": "Plot!4df13ra",
              "direction": "row",
              "splitPercentage": 46.007371007371006
            },
            "direction": "row",
            "splitPercentage": 26.34386540828888
          }
        }
      ]
    }
  },
  "globalVariables": {},
  "userNodes": {},
  "linkedGlobalVariables": [],
  "playbackConfig": {
    "speed": 1,
    "messageOrder": "receiveTime"
  },
  "layout": "Tab!lb68hr"
} as const;
