#pragma strict
import Vectrosity;
import System.Collections.Generic;

private var selectionLine : VectorLine;
private var originalPos : Vector2;
private var lineColors : List.<Color32>;

function Start () {
	lineColors = new List.<Color32>(new Color32[4]);
	selectionLine = new VectorLine("Selection", new List.<Vector2>(5), null, 3.0, LineType.Continuous);
	selectionLine.capLength = 1.5;
}

function OnGUI () {
	GUI.Label(Rect(10, 10, 300, 25), "Click & drag to make a selection box");
}

function Update () {
	if (Input.GetMouseButtonDown(0)) {
		StopCoroutine ("CycleColor");
		selectionLine.SetColor (Color.white);
		originalPos = Input.mousePosition;
	}
	if (Input.GetMouseButton(0)) {
		selectionLine.MakeRect (originalPos, Input.mousePosition);
		selectionLine.Draw();
	}
	if (Input.GetMouseButtonUp(0)) {
		StartCoroutine ("CycleColor");
	}
}

function CycleColor () {
	while (true) {
		for (var i = 0; i < 4; i++) {
			lineColors[i] = Color.Lerp (Color.yellow, Color.red, Mathf.PingPong((Time.time+i*.25)*3.0, 1.0));
		}
		selectionLine.SetColors (lineColors);
		yield;
	}
}