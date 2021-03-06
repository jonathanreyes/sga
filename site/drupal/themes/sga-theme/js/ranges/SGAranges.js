// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.SGAranges = {};

  (function($, SGAranges, _, Backbone) {
    var _ref, _ref1, _ref10, _ref11, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
      _this = this;
    SGAranges.Work = (function(_super) {
      __extends(Work, _super);

      function Work() {
        _ref = Work.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Work.prototype.defaults = {
        "url": "",
        "id": "",
        "flat": false
      };

      return Work;

    })(Backbone.Model);
    SGAranges.Range = (function(_super) {
      __extends(Range, _super);

      function Range() {
        _ref1 = Range.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      Range.prototype.defaults = {
        "id": "",
        "label": "",
        "meta": ""
      };

      return Range;

    })(Backbone.Model);
    SGAranges.Canvas = (function(_super) {
      __extends(Canvas, _super);

      function Canvas() {
        _ref2 = Canvas.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      Canvas.prototype.defaults = {
        "id": "",
        "label": "",
        "position": 1,
        "scUrl": "",
        "imgUrl": "",
        "status": {
          t: "grn",
          m: "grn"
        }
      };

      return Canvas;

    })(Backbone.Model);
    SGAranges.WorkList = (function(_super) {
      __extends(WorkList, _super);

      function WorkList() {
        _ref3 = WorkList.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      WorkList.prototype.model = SGAranges.Work;

      return WorkList;

    })(Backbone.Collection);
    SGAranges.RangeList = (function(_super) {
      __extends(RangeList, _super);

      function RangeList() {
        _ref4 = RangeList.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      RangeList.prototype.model = SGAranges.Range;

      return RangeList;

    })(Backbone.Collection);
    SGAranges.CanvasList = (function(_super) {
      __extends(CanvasList, _super);

      function CanvasList() {
        _ref5 = CanvasList.__super__.constructor.apply(this, arguments);
        return _ref5;
      }

      CanvasList.prototype.model = SGAranges.Canvas;

      return CanvasList;

    })(Backbone.Collection);
    SGAranges.WorkListView = (function(_super) {
      __extends(WorkListView, _super);

      function WorkListView() {
        this.addOne = __bind(this.addOne, this);
        _ref6 = WorkListView.__super__.constructor.apply(this, arguments);
        return _ref6;
      }

      WorkListView.prototype.target = null;

      WorkListView.prototype.render = function(dest) {
        this.target = dest;
        this.collection.each(this.addOne, this);
        return this;
      };

      WorkListView.prototype.addOne = function(model) {
        var view;
        view = new SGAranges.WorkView({
          model: model
        });
        return $(this.target).append(view.render().$el);
      };

      WorkListView.prototype.clear = function() {
        return this.collection.each(function(m) {
          return m.trigger('destroy');
        });
      };

      return WorkListView;

    })(Backbone.View);
    SGAranges.WorkView = (function(_super) {
      __extends(WorkView, _super);

      function WorkView() {
        _ref7 = WorkView.__super__.constructor.apply(this, arguments);
        return _ref7;
      }

      WorkView.prototype.template = _.template($('#work-template').html());

      WorkView.prototype.initialize = function() {
        this.listenTo(this.model, 'change', this.render);
        return this.listenTo(this.model, 'destroy', this.remove);
      };

      WorkView.prototype.render = function() {
        var thisEl, thisFlat, thisTemplate;
        thisEl = this.$el;
        thisFlat = this.model.attributes.flat;
        thisTemplate = this.template;
        $.ajax({
          url: this.model.attributes.url,
          type: 'GET',
          dataType: 'json',
          processData: false,
          success: function(data) {
            return SGAranges.processManifest(data, thisFlat, thisEl, thisTemplate);
          }
        });
        return this;
      };

      WorkView.prototype.remove = function() {
        this.$el.remove();
        return this;
      };

      return WorkView;

    })(Backbone.View);
    SGAranges.RangeListView = (function(_super) {
      __extends(RangeListView, _super);

      function RangeListView() {
        this.addOne = __bind(this.addOne, this);
        _ref8 = RangeListView.__super__.constructor.apply(this, arguments);
        return _ref8;
      }

      RangeListView.prototype.target = null;

      RangeListView.prototype.render = function(dest) {
        this.target = dest;
        this.collection.each(this.addOne, this);
        return this;
      };

      RangeListView.prototype.addOne = function(model) {
        var view;
        view = new SGAranges.RangeView({
          model: model
        });
        return $(this.target).append(view.render().$el);
      };

      RangeListView.prototype.clear = function() {
        return this.collection.each(function(m) {
          return m.trigger('destroy');
        });
      };

      return RangeListView;

    })(Backbone.View);
    SGAranges.RangeView = (function(_super) {
      __extends(RangeView, _super);

      function RangeView() {
        _ref9 = RangeView.__super__.constructor.apply(this, arguments);
        return _ref9;
      }

      RangeView.prototype.template = _.template($('#range-template').html());

      RangeView.prototype.initialize = function() {
        this.listenTo(this.model, 'change', this.render);
        return this.listenTo(this.model, 'destroy', this.remove);
      };

      RangeView.prototype.render = function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      };

      RangeView.prototype.remove = function() {
        this.$el.remove();
        return this;
      };

      return RangeView;

    })(Backbone.View);
    SGAranges.CanvasListView = (function(_super) {
      __extends(CanvasListView, _super);

      function CanvasListView() {
        this.addOne = __bind(this.addOne, this);
        _ref10 = CanvasListView.__super__.constructor.apply(this, arguments);
        return _ref10;
      }

      CanvasListView.prototype.target = null;

      CanvasListView.prototype.render = function(dest) {
        this.target = dest;
        this.collection.each(this.addOne, this);
        return this;
      };

      CanvasListView.prototype.addOne = function(model) {
        var view;
        view = new SGAranges.CanvasView({
          model: model
        });
        return $(this.target).append(view.render().$el);
      };

      CanvasListView.prototype.clear = function() {
        return this.collection.each(function(m) {
          return m.trigger('destroy');
        });
      };

      return CanvasListView;

    })(Backbone.View);
    SGAranges.CanvasView = (function(_super) {
      __extends(CanvasView, _super);

      function CanvasView() {
        _ref11 = CanvasView.__super__.constructor.apply(this, arguments);
        return _ref11;
      }

      CanvasView.prototype.template = _.template($('#canvas-template').html());

      CanvasView.prototype.initialize = function() {
        this.listenTo(this.model, 'change', this.render);
        return this.listenTo(this.model, 'destroy', this.remove);
      };

      CanvasView.prototype.render = function() {
        this.$el = this.template(this.model.toJSON());
        return this;
      };

      CanvasView.prototype.remove = function() {
        this.$el.remove();
        return this;
      };

      return CanvasView;

    })(Backbone.View);
    SGAranges.processCanvas = function(canv, data, pos) {
      var c, c_id, c_pos, canvas, canvas_safe_id, i, i_url, img_url, resolver, sc_url, _i, _len, _ref12;
      if (pos == null) {
        pos = null;
      }
      canvas = canv["@id"];
      c = new SGAranges.Canvas();
      _this.clv.collection.add(c);
      c_pos = pos != null ? pos : $.inArray(canvas, data.sequences[0].canvases) + 1;
      sc_url = data.service;
      img_url = "";
      _ref12 = data.images;
      for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
        i = _ref12[_i];
        if (i.on === canvas) {
          i_url = i.resource["@id"];
          if (i.resource.service != null) {
            resolver = i.resource.service["@id"];
            img_url = resolver + "?url_ver=Z39.88-2004&rft_id=" + i_url + "&svc_id=info:lanl-repo/svc/getRegion&svc_val_fmt=info:ofi/fmt:kev:mtx:jpeg2000&svc.format=image/jpeg&svc.level=1";
          } else {
            img_url = i_url;
          }
        }
      }
      c_id = canv["@id"];
      canvas_safe_id = c_id.replace(/[:\/\.]/g, "_");
      return c.set({
        "id": canvas_safe_id,
        "label": canv.label,
        "position": c_pos,
        "scUrl": canv.service,
        "imgUrl": img_url,
        "status": {
          t: "grn",
          m: "grn"
        }
      });
    };
    return SGAranges.processManifest = function(data, flat, el, template) {
      var canv, canvas, cur_pos, r, range_safe_id, s_id, struct, w_id, work_safe_id, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref12, _ref13, _ref14, _ref15, _ref16, _results;
      w_id = data["@id"];
      work_safe_id = w_id.replace(/[:\/\.]/g, "_");
      el.html(template({
        "id": work_safe_id,
        "title": data.metadata.title != null ? data.metadata.title + " - " + data.label : data.label,
        "meta": data.metadata
      }));
      _this.rl = new SGAranges.RangeList();
      _this.rlv = new SGAranges.RangeListView({
        collection: _this.rl
      });
      _ref12 = data.structures;
      for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
        struct = _ref12[_i];
        r = new SGAranges.Range();
        _this.rlv.collection.add(r);
        s_id = struct["@id"];
        range_safe_id = s_id.replace(/[:\/\.]/g, "_");
        r.set({
          "id": range_safe_id,
          "label": struct.label
        });
      }
      if (!flat) {
        _this.rlv.render('#' + work_safe_id + ' .panel-body');
      }
      if (flat) {
        _this.cl = new SGAranges.CanvasList();
        _this.clv = new SGAranges.CanvasListView({
          collection: _this.cl
        });
        _ref13 = data.canvases;
        for (_j = 0, _len1 = _ref13.length; _j < _len1; _j++) {
          canv = _ref13[_j];
          SGAranges.processCanvas(canv, data);
        }
        return _this.clv.render('#' + work_safe_id + ' .panel-body');
      } else {
        _ref14 = data.structures;
        _results = [];
        for (_k = 0, _len2 = _ref14.length; _k < _len2; _k++) {
          struct = _ref14[_k];
          _this.cl = new SGAranges.CanvasList();
          _this.clv = new SGAranges.CanvasListView({
            collection: _this.cl
          });
          s_id = struct["@id"];
          range_safe_id = s_id.replace(/[:\/\.]/g, "_");
          cur_pos = 0;
          _ref15 = struct.canvases;
          for (_l = 0, _len3 = _ref15.length; _l < _len3; _l++) {
            canvas = _ref15[_l];
            cur_pos += 1;
            _ref16 = data.canvases;
            for (_m = 0, _len4 = _ref16.length; _m < _len4; _m++) {
              canv = _ref16[_m];
              if (canv["@id"] === canvas) {
                SGAranges.processCanvas(canv, data, cur_pos);
                break;
              }
            }
          }
          _results.push(_this.clv.render('#' + range_safe_id + ' .row'));
        }
        return _results;
      }
    };
  })(jQuery, window.SGAranges, _, Backbone);

  (function($) {
    var wl, wlv;
    wl = new SGAranges.WorkList([
      {
        id: "ox-frankenstein-notebook_a",
        url: "/data/ox/ox-frankenstein-notebook_a/Manifest-index.jsonld",
        flat: true
      }, {
        id: "ox-frankenstein-notebook_b",
        url: "/data/ox/ox-frankenstein-notebook_b/Manifest-index.jsonld",
        flat: true
      }, {
        id: "ox-frankenstein-notebook_c1",
        url: "/data/ox/ox-frankenstein-notebook_c1/Manifest-index.jsonld",
        flat: true
      }, {
        id: "ox-frankenstein-notebook_c2",
        url: "/data/ox/ox-frankenstein-notebook_c2/Manifest-index.jsonld",
        flat: true
      }, {
        id: "ox-frankenstein-volume_i",
        url: "/data/ox/ox-frankenstein-volume_i/Manifest-index.jsonld",
        flat: false
      }, {
        id: "ox-frankenstein-volume_ii",
        url: "/data/ox/ox-frankenstein-volume_ii/Manifest-index.jsonld",
        flat: false
      }, {
        id: "ox-frankenstein-volume_iii",
        url: "/data/ox/ox-frankenstein-volume_iii/Manifest-index.jsonld",
        flat: false
      }
    ]);
    wlv = new SGAranges.WorkListView({
      collection: wl
    });
    return wlv.render("#ranges_wrapper");
  })(jQuery);

}).call(this);
