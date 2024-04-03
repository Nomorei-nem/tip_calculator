import { useState } from 'react';

export default function App() {
	const [baseBill, setBaseBill] = useState(0);

	const [myTip, setMyTip] = useState(0);
	const [friendsTip, setFriendsTip] = useState(0);

	function handleReset() {
		setBaseBill(() => 0);
		setMyTip(() => 0);
		setFriendsTip(() => 0);
	}

	return (
		<div>
			<BillInput baseBill={baseBill} onSetBaseBill={setBaseBill} />

			<SelectPercentage thisTip={myTip} setThisTip={setMyTip}>
				How did you like the Service?
			</SelectPercentage>
			<SelectPercentage thisTip={friendsTip} setThisTip={setFriendsTip}>
				How did your friend like the service?
			</SelectPercentage>

			<Output myTip={myTip} friendsTip={friendsTip} baseBill={baseBill} />
			<Reset onReset={handleReset} />
		</div>
	);
}

function BillInput({ baseBill, onSetBaseBill }) {
	return (
		<div className="input">
			<label htmlFor="billAmount">How much was the bill?</label>
			<input
				type="number"
				id="billAmount"
				min="0"
				value={baseBill}
				onChange={(e) => onSetBaseBill(Number(e.target.value))}
			/>
		</div>
	);
}

function SelectPercentage({ thisTip, setThisTip, children }) {
	return (
		<div>
			<label htmlFor="tipOptions">{children} </label>
			<select
				id="tipOptions"
				value={thisTip}
				onChange={(e) => setThisTip(Number(e.target.value))}
			>
				<option value="0">Dissatisfied (0%)</option>
				<option value="5">It was okay (5%)</option>
				<option value="10">It was good (10%)</option>
				<option value="20">It was absolutely amazing! (20%)</option>
			</select>
		</div>
	);
}

function Output({ myTip, friendsTip, baseBill }) {
	const combinedTip = Number(
		(((myTip + friendsTip) / 2 / 100) * baseBill).toFixed(2)
	);

	console.log(combinedTip, baseBill);

	const totalBill = baseBill + combinedTip;

	return (
		<div className="output">
			You pay ${totalBill} (${baseBill} + ${combinedTip} tip)
		</div>
	);
}

function Reset({ onReset }) {
	return <button onClick={onReset}>Reset</button>;
}
