import React from 'react'
import classNames from 'classnames'
import _ from 'underscore'
import $ from 'jquery'

var data = [
	{
		icon : 'fa-th',
		text : '1',
		href : '#'
	},
	
	{
		icon : 'fa-th',
		text : '2',
		children : [
			{
				icon : 'fa-th',
				text : '2-1',
				href : '#'
			},
			{
				icon : 'fa-th',
				text : '2-2',
				href : '#'
			},
			{
				icon : 'fa-th',
				text : '2-3',
				href : '#'
			}
		]
	},
	
	{
		icon : 'fa-th',
		text : '3',
		children : [
			{
				icon : 'fa-th',
				text : '3-1',
				children : [
					{
						icon : 'fa-th',
						text : '3-1-1',
						children : [
							{
								icon : 'fa-th',
								text : '3-1-1-1',
								href : '#'
							}
						]
					}
				]
			},
			{
				icon : 'fa-th',
				text : '3-2',
				children : [
					{
						icon : 'fa-th',
						text : '3-2-1',
						href : '#'
					}
				]
			}
		]
	}
];

export default class AppSidebar extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			curIndex : '',
			open : false,
			activeIndex : ''
		}
	}

	setCurrentIndex(idx, open, active) {
		var data = {
			curIndex: idx,
			open : open
		};
		if (active) {
			data.activeIndex = idx;
		}
		this.setState(data);
	}

	// shouldComponentUpdate(nextProps, nextState){
	// 	return nextState.curIndex != this.state.curIndex
	// 			|| nextState.open != this.state.open;
	// }


	render() {
		const curItemData = _.extend({}, this.state);
		return (
			<div className="app-sidebar">
				<Menu curItemData={curItemData} 
					  data={data} 
					  isChild={false}
					  setIndexHandler={(idx, open, active) => this.setCurrentIndex(idx, open, active)}
					  idxPrefix={'0'}/>
			</div>
		);
	}
}

class Menu extends React.Component {

	constructor(props){
		super(props);
	}

	handleItemClick(item, idx, hasChild){
		const curItemData = this.props.curItemData;
		var open = false;
		if (!item.href) {
			// todo:
			var index = idx;
			if (!curItemData.open && curItemData.activeIndex.startsWith(idx)) {
				index = curItemData.activeIndex;
			} else {
				if (curItemData.curIndex.startsWith(idx)) {
					open = curItemData.curIndex == idx ? !curItemData.open : false;
				} else if (idx != curItemData.curIndex) {
					open = true;
				}
			}
			this.props.setIndexHandler(index, open);
		} else {
			this.props.setIndexHandler(idx, open, true);
		}
		
	}

	computeLiClass(item, idx){
		
		const curItemData = this.props.curItemData,
			  isCurrent = curItemData.curIndex == idx,
			  isActive = curItemData.activeIndex == idx,
			  cls = [];

		  if (isActive) {
		  	cls.push('active');
		  }

		if (isCurrent) {
			if (!item.href && curItemData.open) {
				cls.push('open');
			}
		} else {
			if (!item.href && curItemData.curIndex.startsWith(idx)) {
				cls.push('open');
			}
		}

		return classNames(cls);

	}

	computeNode(data) {
			const node = [],
				curItemData = this.props.curItemData,
				setIndexHandler = this.props.setIndexHandler,
				onItemClick = (text, idx, hasChild) => this.handleItemClick(text, idx, hasChild),
				itemCls = (item, idx) => this.computeLiClass(item, idx);

			data.forEach((item, index) => {
				var idx = this.computeIdx(index);
				if (item.children && item.children.length > 0) {
					node.push(
						<SubMenu item={item} 
								 key={idx} 
								 onItemClick={onItemClick}
								 itemCls={ itemCls(item, idx) }
								 idx={idx}>

							<Menu data={item.children} 
									curItemData={curItemData}
									setIndexHandler={setIndexHandler}
									isChild={true}
									idxPrefix={idx}
									/>
						</SubMenu>
					);
				} else {
					node.push(
						<SubMenu item={item}
								   key={idx} 
							       onItemClick={onItemClick}
							       itemCls={ itemCls(item, idx) }
							       idx={idx}/>
							);
				}
			}, this);

			return node;
	}

	computeIdx(index) {
		return this.props.idxPrefix + '-' + index;
	}

	render() {
		const data = this.props.data,
			isChild = this.props.isChild,
			cls = classNames('nav', {'sidebar-menu' : !isChild}, { submenu : isChild });
		return (
			<ul className={ cls }>
				{this.computeNode(data)}
			</ul>
		);
	}
}


class SubMenu extends React.Component {
	
	render() {
		const item = this.props.item,
			hasChild = React.Children.count(this.props.children),
			iconCls = classNames('menu-icon', 'fa', item.icon),
			liCls = this.props.itemCls,
			expandEl = hasChild ? <i className={ classNames({'fa fa-angle-right expand' : hasChild}) }></i> : null;
		return (
			<li className={ liCls }>
				<a href={ item.href } onClick={() => this.props.onItemClick(item, this.props.idx, hasChild)}>
					<i className={ iconCls }></i>
					<span className="menu-text">{item.text}</span>
					{expandEl}
				</a>
				{this.props.children}
			</li>
		);
	}
}

SubMenu.propTypes = {
	item : React.PropTypes.object.isRequired,
	onItemClick: React.PropTypes.func.isRequired
};


