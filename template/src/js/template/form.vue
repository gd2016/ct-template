<template>
    <div>
        <form-item type="select" v-model="formData.Type" valueClass="col-sm-4" :selectList="TypeList" required label="选择与输入">
            <div class="col-sm-5">
                <input :disabled="formData.Type==1" class="form-control" />
            </div>
        </form-item>
        <form-item label="表格">
            <table v-if="dataList.length" class="table table-bordered table-striped table-hover table-condensed">
                <thead>
                    <tr>
                        <th style="width:25%">奖品名称</th>
                        <th style="width:25%">物品图片</th>
                        <th style="width:25%">每次中奖发放个数</th>
                        <th style="width:25%">使用音效</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in dataList" :key="index" >
                        <td>\{{item.PrizeName}}</td>
                        <td class="text-center"><img :src="item.PrizePic" /></td>
                        <td>\{{item.RewardNumber}}</td>
                        <td>\{{item.Music===0?'普通音效':'特殊音效'}}</td>
                    </tr>
                </tbody>
            </table>
        </form-item>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            dataList: [
                {
                    Id: 7,
                    RoomConfigId: 15,
                    Disable: 0,
                    CreateTime: 1533554932496,
                    PrizeId: 23132,
                    PrizeName: '疯狂打礼物实物',
                    PrizeCode: 'SW-FKDLW-001',
                    PrizePic:
            'http://fdsimgtest.uc108.com/operatesys/item/ct935-be8757b8-05ca-4326-8dc5-e4a77acc0a2c.jpg',
                    RewardNumber: 1,
                    Music: 1
                }
            ]
        };
    }
};
</script>
<style>
img{
  width: 100px;
  height: 100px;
}
</style>
