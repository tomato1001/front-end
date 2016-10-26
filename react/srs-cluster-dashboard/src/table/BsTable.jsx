'use strict';
import React from 'react';
import {
	Table,
	Grid,
	Row,
	Col,
	Pagination,
	DropdownButton,
	MenuItem,
	Panel,
	ButtonToolbar,
	Button
} from 'react-bootstrap';
import BsTableBody from './BsTableBody';
import BsTableHeader from './BsTableHeader';
import styles from './table.scss';
import cx from 'classnames';

class BsTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            curPage: 1,
            pageSize: 10
        };
    }

	render() {
		const pagination = this.renderPagination();
		const {showToolbar} = this.props;
		const {title, nestedInPanel} = this.props;
		const row = () => {
			if (nestedInPanel) {
				return (
					<Row>
						<Panel header={title}>
							{this.renderTable()}
							{pagination}
						</Panel>
     				</Row>
				);
			}
			return (
				<Row>
					{this.renderTitle()}
					{this.renderTable()}
					{pagination}
 				</Row>
			);
		}
		
		const toolbar = () => {
			if (showToolbar) {
				return (
					<Row className={styles.toolbar}>
						<Button href="javascript:void(0)" onClick={() => this.handleRefresh()}>
							<i className="glyphicon glyphicon-refresh icon-refresh"></i>
						</Button>
					</Row>
				);
			}
		}
		
		const loading = () => {
			const {showLoading} = this.props;
			if (showLoading) {
				let loadingCls = styles.loading
				const loadingCx = cx({
					[`${loadingCls}`]: true
				});
				let loadingStyle = {};
				if (this.props.nestedInPanel) {
					loadingStyle.top = showToolbar ? 150 : 100;
				}
				return <Row className={loadingCx} style={loadingStyle}>正在努力地加载数据中，请稍候……</Row>;
			}
		}
		
		return (
			<Grid>
				{loading()}
				{toolbar()}
				{row()}
			</Grid>
		);
	}
    
    onPageSizeChange(key, evt) {
		let value = parseInt(key);
		let {curPage} = this.state;
		if (curPage * value > this.props.rowCount) {
			curPage = 1;
		}
		const {showLoading} = this.props;
		if (!showLoading) {
			this.setState(Object.assign({}, this.state, {pageSize: value, curPage: curPage}));
			this.handleFetchData(curPage, value);
		}
    }
    
    onPageNumberSelect(eventKey) {
		const value = parseInt(eventKey),
			{showLoading} = this.props;
		if (!showLoading) {
			this.setState(Object.assign({}, this.state, {curPage: value}));
			this.handleFetchData(value, this.state.pageSize);
		}
    }
	
	handleFetchData(curPage, pageSize) {
		const state = this.state;
		if (state.curPage != curPage || state.pageSize != pageSize) {
			this.props.onHandleFetchData(curPage, pageSize);
		}
	}
	
	handleRefresh() {
		const {showLoading} = this.props;
		const {curPage, pageSize} = this.state;
		if (!showLoading) {
			this.props.onHandleFetchData(curPage, pageSize);
		}
	}

	renderTitle() {
		const {title} = this.props;
		if (title) {
			return (
				<h1 className={styles.title}>{title}</h1>
			);
		}
	}
	
	renderTable() {
		const classNames = this.props.className || styles['react-table'];
		const {striped, bordered, condensed, hover, className} = this.props;
		const columns = this.getColumns(this.props.children);
		const tbodyStyle = {
			visibility: this.props.showLoading ? "hidden" : "visible"
		};
		return (
			<Table fill striped={striped} bordered={bordered} condensed={condensed} hover={hover} className={classNames}>
				<BsTableHeader>
					{this.props.children}
				</BsTableHeader>
				<BsTableBody style={tbodyStyle} columns={columns} data={this.props.data}/>
			</Table>
		);

	}

	renderPagination() {
		const {showLoading} = this.props;
		if (this.props.pagination && !showLoading) {
			const {rowCount, showLoading} = this.props;
			if (rowCount <= 0) {
				return (
					<Row className="text-center">
    					<span>没有找到任何记录</span>
    				</Row>
				);
			}
			const clsReactPagination = styles['react-pagination'];
            const {pageSize, curPage} = this.state;
			let start = curPage == 1 ? 1 : (curPage - 1) * pageSize;
			if (rowCount == 0) {
				start = 0;
			}
			let end = curPage == 1 ? pageSize : curPage * pageSize;
			end = end > rowCount ? rowCount : end;
			const pageCount = Math.ceil(rowCount / pageSize);
			const noMarginCn = styles.noMargin;
			const pagination = () => {
				if (pageCount > 1) {
					const rppCn= styles['react-pagination-page'];
					const classNames = cx({
						[`${rppCn}`]: true,
						[`${noMarginCn}`]: !this.props.nestedInPanel
					});
					return (
							<Col md={6} className={classNames}>
								<Pagination prev next ellipsis boundaryLinks items={pageCount} maxButtons={5} 
									className={styles['react-pagination-page-pagination']}
									activePage={this.state.curPage}
									onSelect={eventKey => this.onPageNumberSelect(eventKey)} />
							</Col>
						);
				}
			}
			
			const rpiCn = styles['react-pagination-info'];
			const classNames = cx({
				[`${rpiCn}`]: true,
				[`${noMarginCn}`]: !this.props.nestedInPanel
			});
			
			return (
				<Row className={styles['react-pagination']}>
					<Col md={6} className={classNames}>
						<span>显示第 {start} 到第 {end} 条记录，总共{rowCount}条记录每页显示</span>
						<DropdownButton title={pageSize} id="pagination-dropdown" dropup onSelect={(key, evt) => this.onPageSizeChange(key, evt)}>
							<MenuItem eventKey="10">10</MenuItem>
							<MenuItem eventKey="20">20</MenuItem>
							<MenuItem eventKey="50">50</MenuItem>
						</DropdownButton>
						<span>条记录</span>
					</Col>
					{pagination()}
				</Row>
			);
		}
	}

	getColumns(children) {
		return React.Children.map(children, c => {
			var {field, dataAlign} = c.props;
			return {field: field, dataAlign: dataAlign};
		});
	}
}

BsTable.propTypes = {
	data: React.PropTypes.array,
	striped: React.PropTypes.bool,
	bordered: React.PropTypes.bool,
	condensed: React.PropTypes.bool,
	hover: React.PropTypes.bool,
	className: React.PropTypes.string,
	pagination: React.PropTypes.bool,
	title: React.PropTypes.string,
	rowCount: React.PropTypes.number,
	showLoading: React.PropTypes.bool,
	onHandleFetchData: React.PropTypes.func,
	showToolbar: React.PropTypes.bool
};

export default BsTable;
