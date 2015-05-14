import React from 'react/addons'
import _ from 'lodash'
import BookmarksService from './services/BookmarksService'
import BrowserService from './services/BrowserService'
import Tag from './Tag'
import Input from './Input'
import Button from './Button'

const KEY_TAB = 9;
const KEY_ENTER = 13;

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin
  ],

  render: function () {
    let tagslist = this.state.tagslist;
    let categories = this.state.categories;
    console.log(this.state.urlExist);
    if (this.state.urlExist === true) {
      return (
        <h1 key={"urlExist"} style={savedStyle}>Saved</h1>
      );
    } else {
      return (
        <div key={"form"}>
          <Input
            name="title"
            errMsg="required"
            showError={this.isNonEmpty(this.state.title)}
            valueLink={this.linkState('title')}
          />
          <Input
            name="url"
            type="text"
            errMsg="required"
            showError={this.isNonEmpty(this.state.url)}
            valueLink={this.linkState('url')}
          />
          <Input
            name="description"
            type="textarea"
            valueLink={this.linkState('description')}
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            ref="category"
            valueLink={this.linkState('category')}
            >
            {categories.map(category => {
              return (
                <option
                  key={category.id}
                  value={category.name}
                >{category.name}</option>
              );
            })}
          </select>
          <Input
            name="addtag"
            lable="Add Tags"
            list="tagslist"
            listData={this.state.tagslist}
            value={this.state.addtag}
            onChange={this.handleChange}
            onKeyDown={this.onKeyDown}
          />
          <datalist id="tagslist">
            {this.state.tagslist.map((tag, i) =>
              <option key={tag + "-" + i} value={tag} />
            )}
          </datalist>
          <ul className="bookmark-tags">
            {this.state.tags.map(tag => {
              return (
                <Tag
                  key={tag}
                  name={tag}
                  removeTag={this.removeEditedTag(tag)}
                  active={true}
                />
              );
            })}
          </ul>
          <Button name="Save" iconClass="fa fa-floppy-o" onClick={this.onSave} />
        </div>
      );
    }
  },

  onSave: function (e) {
    let newBookmark = {
      title: this.state.title,
      url: this.state.url,
      description: this.state.description,
      tags: this.state.tags,
      category: this.state.category,
    }
    // TODO validate data
    console.log("Form.onSave", this.state);
    BookmarksService.save(newBookmark).then(res => {
      this.setState({
        urlExist: true
      })
    }, err => {
      console.log("onSave", err);
    });
  },

  getInitialState: function () {
    return {
      url: "",
      title: "",
      description: "",
      category: "",
      categories: [],
      tags: [],
      tagslist: [],
      addTag: "",
      urlExist: false
    };
  },

  onKeyDown: function (e) {
    if (e.which === KEY_TAB || e.which === KEY_ENTER) {
      e.preventDefault();
      this.state.tags.push(this.state.addtag)
      this.setState({
        tags: this.state.tags,
        addtag: ""
      });
    }
  },

  handleChange: function(event) {
    this.setState({
      addtag: event.target.value
    });
  },

  isNonEmpty: function (value) {
    return (value == "") ? true : false
  },

  removeEditedTag: function (tag) {
    return function () {
      this.setState({
        tags: this.state.tags.filter(t => t !== tag)
      });
    }.bind(this);
  },

  componentDidMount: function () {
    BookmarksService.getCategories().then(categories => {
      this.setState({
        categories: categories,
        category: (categories.length > 0) ? categories[0].name : ""
      });
    });

    BookmarksService.getTags().then(tags => {
      this.setState({
        tagslist: tags
      });
    });

    BookmarksService.is

    BrowserService.getTabInfo().then(res => {
      this.setState({
        url: res.url,
        title: res.title
      });
      BookmarksService.isExist(res.url).then(res => {
        console.log("isExist", res);
        this.setState({ urlExist: true });
      }, err => {
        this.setState({ urlExist: false });
      });
    });
  }

});


let savedStyle = {
  textAlign: 'center',
  fontSize: '3rem',
  paddingTop: '115px',
  color: 'rgba(0, 255, 0, 0.6)',
};

